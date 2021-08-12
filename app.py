# instalar flask alchemy
# pip install flask-sqlalchemy

# instalar postgreSql
#pip install psycopg2

from flask import Flask, render_template, redirect, request, session, flash
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.secret_key = 'heroes'
senha = '123'

app.config ['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///heroes.sqlite3'

db = SQLAlchemy(app)

class Super_heroes(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=True, autoincrement=True)
    nome = db.Column(db.String(25), nullable=True)
    descricao = db.Column(db.String(300), nullable=True)
    editora = db.Column(db.String(10), nullable=True)
    foto = db.Column(db.String(), nullable=True)



    def __init__(self, nome, descricao, editora, foto):
        self.nome = nome
        self.descricao = descricao
        self.editora = editora
        self.foto = foto


# rota principal que retorna todos os heroes da tabela Super Heroes
@app.route('/')
def index():
    session['log'] = None
    super_heroes = Super_heroes.query.all()
    return render_template('index.html', listaMarvel = super_heroes, listaDc = super_heroes)

# SELECT - rota criada para retornar um heroe filtrado por id (usado para retornar a foto)
@app.route('/<id>')
def select_by_id(id):
    super_heroe = Super_heroes.query.get(id)
    return render_template('crud.html', deleteHeroe = super_heroe, super_heroe = '')

# INSERT - rota criada para inserir personagems no DB
@app.route('/new', methods = ['GET', 'POST'])
def new():
    if request.method == 'POST':
        super_heroe = Super_heroes(
            request.form['nome'],
            request.form['descricao'],
            request.form['editora'],
            request.form['foto'],
        )
        db.session.add(super_heroe)
        db.session.commit()
        return redirect('/crud')

    return render_template('crud.html')    


# DELETE - rota para deletar o personagem filtrado por id
@app.route('/delete/<id>')
def delete(id):
    super_heroe_del = Super_heroes.query.get(id)
    db.session.delete(super_heroe_del)
    db.session.commit()
    return redirect('/crud')       

# UPDATE - rota para editar personagem
@app.route('/edite/<id>', methods = ['GET','POST'])
def edite(id):
    super_heroes = Super_heroes.query.all()
    super_heroe = Super_heroes.query.get(id)
    if request.method == 'POST':
        super_heroe.nome = request.form['nome']
        super_heroe.descricao = request.form['descricao']
        super_heroe.editora = request.form['editora']
        super_heroe.foto = request.form['foto']
        db.session.commit()
        return redirect('/crud')    
    return render_template('crud.html', super_heroe = super_heroe, super_heroes = super_heroes)

@app.route('/wikiM')
def wiki_marvel():
    session['log'] = None
    super_heroes = Super_heroes.query.all()
    return render_template('wikiM.html', listaMarvel = super_heroes)

@app.route('/wikiDc')
def wiki_dc():
    session['log'] = None
    super_heroes = Super_heroes.query.all()
    return render_template('wikiDC.html', listaDc = super_heroes)

@app.route('/dev')
def dev():
    session['log'] = None
    return render_template('desenvol.html')

@app.route('/crud')
def crud():
    if 'log' not in  session or session['log'] == None:
        return redirect ('/login')
    super_heroes = Super_heroes.query.all()
    return render_template('crud.html', super_heroes = super_heroes, super_heroe = '') 


@app.route('/login')
def login():
    session['log'] = None
    return render_template('login.html')


@app.route('/auth', methods = ['GET', 'POST'])
def auth():
    if request.form['senha'] == senha:
        session['log'] = 'admin'  
        flash('Login feito com sucesso!')
        return redirect('/crud') 
    else:
        flash('Erro ao fazer login, tente novamente.')
        return redirect('/login')

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)