module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          nama_prodak: {
            type: DataTypes.STRING,
            allowNull: false
          },
          jenis: {
            type: DataTypes.STRING,
            allowNull: false
          },
          deskripsi: {
            type: DataTypes.TEXT
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
          }
    }, {
       tableName: 'products'
    });

    return Product;
}