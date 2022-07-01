module.exports = (sequelize, DataTypes) => {
  const Receipts = sequelize.define("Receipts", {
    startingTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endingTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    startLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    driverName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numberOfPassengers: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Receipts;
};
