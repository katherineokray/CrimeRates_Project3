from flask import Flask, render_template, request, redirect, url_for, jsonify
import psycopg2
app = Flask(__name__)
@app.route('/')
def index():
    return render_template('index.html')
@app.route('/offense')
def offense():

    conn = psycopg2.connect(database="covid_crimes", user="postgres",password="postgres", host="localhost", port="5432")

    # create a cursor
    cur = conn.cursor()

    # Select all products from the table
    cur.execute ("""
        SELECT EXTRACT('YEAR' FROM occurred_date) as date, count(*) as crime
        FROM crime WHERE offense = 'FAMILY DISTURBANCE'
        group by date
        order by date"""
    )
  
    # Fetch the data
    data = cur.fetchall()
    print(data)
    # close the cursor and connection
    cur.close()
    conn.close()
    return jsonify(data)

@app.route("/heatMap")
def heatmap():

    conn = psycopg2.connect(database="covid_crimes", user="postgres",password="postgres", host="localhost", port="5432")

    # create a cursor
    cur = conn.cursor()
    
    cur.execute ('''SELECT offense, latitude, longitude FROM crime
    WHERE zip BETWEEN 78701 AND 78723''')
    
      # Fetch the data
    data = cur.fetchall()
    print(data)
    # close the cursor and connection
    cur.close()
    conn.close()
    return jsonify(data)

@app.route("/update")
def update():

    conn = psycopg2.connect(database="covid_crimes", user="postgres",password="postgres", host="localhost", port="5432")

    # create a cursor
    cur = conn.cursor()
    
    cur.execute (''' SELECT EXTRACT('YEAR' FROM occurred_date) as date, count(*) as crime
        FROM crime WHERE offense = $_POST['dropdown']
        group by date
        order by date''')
    
      # Fetch the data
    data = cur.fetchall()
    print(data)
    # close the cursor and connection
    cur.close()
    conn.close()
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)














