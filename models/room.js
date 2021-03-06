'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class Room extends Model {}
  Room.init({
    name: DataTypes.STRING,
    players: DataTypes.JSON
  },{sequelize})
  Room.associate = function(models) {
    // associations can be defined here
  };
  return Room;
};