module.exports = (sequelize, dataTypes) => {
    let alias = 'Order_Product';
    
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        products_id: {
            type: dataTypes.INTEGER,
        },
        orders_id: {
            type: dataTypes.INTEGER,
        },
        units: {
            type: dataTypes.INTEGER,
        }
    };
    
    let config = {
      tableName : "order_product",
      timestamps: false
    }
    
    const Order_Product = sequelize.define(alias, cols, config);
    
    Order_Product.associate = function(models) {
        Order_Product.belongsTo(models.Product,{
            as: 'order_product_product',
            foreignKey: 'products_id'
        })

        Order_Product.belongsTo(models.Order,{
            as: 'order_product_order',
            foreignKey: 'orders_id'
        })
    }
    return Order_Product;
  }
  