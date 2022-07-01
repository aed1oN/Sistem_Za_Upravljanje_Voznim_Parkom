module.exports = (sequelize, DataTypes) => {
  const Vehicles = sequelize.define("Vehicles", {
    vehicleBrand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehicleId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    engineId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    powerkW: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    powerKS: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fuel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productionYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Vehicles.associate = (models) => {
    Vehicles.hasOne(models.Receipts);
  };

  return Vehicles;
};
