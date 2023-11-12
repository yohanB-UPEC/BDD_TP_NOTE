import psycopg2
from psycopg2 import pool

class Database:
    _connection_pool = None
    @staticmethod
    def initialise(**kwargs):
        try:
            Database._connection_pool = psycopg2.pool.SimpleConnectionPool(1, 10, **kwargs)
            print("Connexion à la base de données réussie")
        except Exception as e:
            print(f"Erreur de connexion: {e}")

    @staticmethod
    def get_connection():
        try:
            return Database._connection_pool.getconn()
        except Exception as e:
            print(f"Erreur lors de la récupération de la connexion: {e}")
            return None

    @staticmethod
    def return_connection(connection):
        Database._connection_pool.putconn(connection)

    @staticmethod
    def close_all_connections():
        Database._connection_pool.closeall()

    @staticmethod
    def execute_query(query, params=None, commit=False):
        try:
            connection = Database.get_connection()
            with connection.cursor() as cursor:
                cursor.execute(query, params)

                if commit:
                    connection.commit()
                if query.strip().upper().startswith('INSERT'):
                    return None
                else:
                    return cursor.fetchall()

        except Exception as e:
            print(f"Erreur pendant l'exécution de la requête: {e}")
            return None

        finally:
            Database.return_connection(connection)

def add_stock(product_id, stock_id, amount):
    try:
        print("Ajout de stock")
        Database.execute_query(
            'UPDATE stock_products SET quantity = quantity + %s WHERE id_product = %s AND id_stock = %s',
            (amount, product_id, stock_id),
            commit=True
        )
    except Exception as e:
        print(f"Erreur lors de l'ajout de stock: {e}")

def remove_stock(product_id, stock_id, amount):
    print("Retrait de stock")
    current_stock = Database.execute_query(
        'SELECT quantity FROM stock_products WHERE id_product = %s AND id_stock = %s',
        (product_id, stock_id)
    )

    if current_stock and current_stock[0][0] >= amount:
        Database.execute_query(
            'UPDATE stock_products SET quantity = quantity - %s WHERE id_product = %s AND id_stock = %s',
            (amount, product_id, stock_id),
            commit=True
        )
    else:
        print("Pas assez de stock")

def create_transaction(product_id, stock_id, amount, transaction_type):
    print("Creation de la transaction")
    try:
        connection = Database.get_connection()
        with connection.cursor() as cursor:
            cursor.execute("BEGIN;")

            if transaction_type == 'INCOMING':
                cursor.execute(
                    'UPDATE stock_products SET quantity = quantity + %s WHERE id_product = %s AND id_stock = %s',
                    (amount, product_id, stock_id)
                )
            elif transaction_type == 'OUTGOING':
                cursor.execute(
                    'UPDATE stock_products SET quantity = quantity - %s WHERE id_product = %s AND id_stock = %s AND quantity >= %s',
                    (amount, product_id, stock_id, amount)
                )
                if cursor.rowcount == 0:
                    raise Exception("Pas assez de stock pour la transaction OUTGOING.")

            cursor.execute(
                'INSERT INTO transactions (id_product, id_stock, quantity, transaction_type) VALUES (%s, %s, %s, %s)',
                (product_id, stock_id, amount, transaction_type)
            )

            connection.commit()
    except Exception as e:
        print(f"Erreur lors de la creation de la transaction : {e}")
        if connection:
            connection.rollback()
    finally:
        Database.return_connection(connection)


def validate_input(input_str, expected_type):
    try:
        return expected_type(input_str)
    except ValueError:
        print(f"Erreur: Entrée invalide. Attendu {expected_type.__name__}")
        return None

def transaction_command():
    product_id = validate_input(input("Entrer l'id de produit: "), int)
    stock_id = validate_input(input("Entrer l'id de stock: "), int)
    amount = validate_input(input("Entrer la quantité: "), int)
    transaction_type = input("Entrer le type de transaction (INCOMING/OUTGOING): ").upper()

    if product_id is not None and stock_id is not None and amount is not None:
        create_transaction(product_id, stock_id, amount, transaction_type)
    else:
        print("Transaction annulée en raison d'une entrée invalide.")

def display_stock_products_command():
    stock_id = validate_input(input("Entrer l'id de stock: "), int, "id de stock")
    if stock_id is not None:
        print("Liste des produits disponibles dans le stock demandé:\n",
              Database.execute_query(
                  'SELECT products.id, products.name, stock_products.quantity FROM products INNER JOIN stock_products ON products.id = stock_products.id_product WHERE stock_products.id_stock = %s',
                  (stock_id,)
              ))
    else:
        print("Commande annulée en raison d'une entrée invalide.")


def main():
    Database.initialise(user='postgres', password='', database='bdd_tp_note', host='localhost')

    quit_program_flag = False

    def display_help():
        print("Liste des commandes:")
        print("- h  : Afficher l'aide")
        print("- s  : Afficher la liste des stocks")
        print("- p  : Afficher la liste des produits")
        print("- sp : Afficher la liste des produits disponibles dans le stock demandé")
        print("- t  : Faire une transaction (ajouter ou retirer une certaine quantité d'un produit d'un stock)")
        print("- q  : Quitter")

    def quit_program():
        nonlocal quit_program_flag
        quit_program_flag = True

    commands = {
        'h': display_help,
        's': lambda: print("Liste des stocks:\n", Database.execute_query('SELECT * FROM stocks')),
        'p': lambda: print("Liste des produits:\n", Database.execute_query('SELECT * FROM products')),
        'sp': display_stock_products_command,
        't': transaction_command,
        'q': lambda: quit_program()
    }

    while not quit_program_flag:
        command = input("Entrer une commande: ").lower()
        handler = commands.get(command, lambda: print("Commande inconnue"))
        handler()

    Database.close_all_connections()

if __name__ == '__main__':
    main()
