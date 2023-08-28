from sqlalchemy import create_engine
userName = "postgres"
password = "postgres" #use your postgres password if you changed it
database = "covid_crimes" #you can use any db you want, I just happened to use this one

#engine = create_engine("sqlite:///pets.sqlite")
engine = create_engine(f"postgresql+psycopg2://{userName}:{password}@localhost:5432/{database}")


conn = engine.connect()