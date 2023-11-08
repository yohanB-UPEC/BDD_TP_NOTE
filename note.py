import math
import psycopg2
from psycopg2 import pool

class Database:
    _connection_pool = None
    @staticmethod
    def initialise(**kwargs):
        try:
            Database._connection_pool = psycopg2.pool.SimpleConnectionPool(1, 10, **kwargs)
        except:
            print("Error while connecting to the database")
        
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
                return cursor.fetchall()
        except:
            print("Error while executing query")
            return None
        finally:
            Database.return_connection(connection)
    
def add_stock(product_id, stock_id, amount):
    print("Adding stock")
    Database.execute_query(
        'UPDATE stock_products SET quantity = quantity + %s WHERE id_product = %s AND id_stock = %s', 
        (amount, product_id, stock_id), 
        commit=True
    )

def remove_stock(product_id, stock_id, amount):
    print("Removing stock")
    # This function should also check if there is enough stock to remove
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
        print("Not enough stock to remove")

def create_transaction(product_id, stock_id, amount, transaction_type):
    print("Creating transaction")
    # The function now requires the stock_id to specify the stock involved in the transaction
    Database.execute_query(
        'INSERT INTO transactions (id_product, id_stock, quantity, transaction_type) VALUES (%s, %s, %s, %s)',
        (product_id, stock_id, amount, transaction_type),
        commit=True
    )

            
def main():
    # Initialise database connection
    Database.initialise(user='postgres', password='test', database='Cours1', host='localhost')

    quit = False
    while not quit:
        c = input("Enter command: ")
        if c == 'q':
            quit = True
        elif c == 'h':
            print("Liste des Commands:")
            print("- h  : Afficher l'aide")
            print("- s  : Afficher la liste des stocks")
            print("- p  : Afficher la liste des produits")
            print("- sp : Afficher la liste des produits disponible dans le stock demandé")
            print("- t  : Faire une transaction (ajouter ou retirer une certaine quantité d'un produit d'un stock)")
            print("- q  : Quitter")
            
    
    
    # Close database connection
    Database.close_all_connections()
    
if __name__ == '__main__':
    main()

