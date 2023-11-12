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
        return Database._connection_pool.getconn()

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
    print("Ajout de stock")
    Database.execute_query(
        'UPDATE stock_products SET quantity = quantity + %s WHERE id_product = %s AND id_stock = %s',
        (amount, product_id, stock_id),
        commit=True
    )

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
    Database.execute_query(
        'INSERT INTO transactions (id_product, id_stock, quantity, transaction_type) VALUES (%s, %s, %s, %s)',
        (product_id, stock_id, amount, transaction_type),
        commit=True
    )

def main():
    Database.initialise(user='postgres', password='test', database='Cours1', host='localhost')

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
        'sp': lambda: print("Liste des produits disponibles dans le stock demandé:\n",
                        Database.execute_query(
                            'SELECT products.id, products.name, stock_products.quantity FROM products INNER JOIN stock_products ON products.id = stock_products.id_product WHERE stock_products.id_stock = %s',
                            (input("Entrer l'id de stock: "),)
                        )),
        't': lambda: create_transaction(
            input("Entrer l'id de produit: "),
            input("Entrer l'id de stock: "),
            input("Entrer la quantité: "),
            input("Entrer le type de transaction (INCOMING/OUTGOING): ")
        ),
        'q': lambda: quit_program()
    }

    while not quit_program_flag:
        command = input("Entrer une commande: ").lower()
        handler = commands.get(command, lambda: print("Commande inconnue"))
        handler()

    Database.close_all_connections()

if __name__ == '__main__':
    main()
