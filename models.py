"""Models for Cupcake app."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Cupcake(db.Model):
    """Cupcakes Model"""

    __tablename__ = "cupcakes"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    flavor = db.Column(db.String(255), nullable=False)
    size = db.Column(db.String(255), nullable=False)
    rating = db.Column(db.Float, nullable=False)
    image = db.Column(db.String(255), nullable=False, default='https://tinyurl.com/demo-cupcake')

    def serialize(self):
        """Serialize cupcake object to JSON"""
        return {
            'id': self.id,
            'flavor': self.flavor,
            'size': self.size,
            'rating': self.rating,
            'image': self.image
        }

def connect_db(app):
    """Connect to database"""
    db.app = app
    db.init_app(app)