const { User, Score, Chat } = require('../models');
const { Op } = require('sequelize');

// searches open chat rooms where the userData has a higher score
const searchChat = async (userData) => {
  const chatData = await Chat.findAll({
    attributes: [
      'id',
      'subject',
      'subjectScore',
      'isOpen',
      'userId',
      'user.username',
    ],
    include: { model: User, attributes: [] },
    where: {
      [Op.and]: [
        { isOpen: true },
        {
          [Op.or]: [
            {
              [Op.and]: [
                { subject: 'vanillaJs' },
                { subjectScore: { [Op.lt]: userData.score.vanillaJs } },
              ],
            },
            {
              [Op.and]: [
                { subject: 'mySql' },
                { subjectScore: { [Op.lt]: userData.score.mySql } },
              ],
            },
            {
              [Op.and]: [
                { subject: 'nodeJs' },
                { subjectScore: { [Op.lt]: userData.score.nodeJs } },
              ],
            },
            {
              [Op.and]: [
                { subject: 'express' },
                { subjectScore: { [Op.lt]: userData.score.express } },
              ],
            },
            {
              [Op.and]: [
                { subject: 'oop' },
                { subjectScore: { [Op.lt]: userData.score.oop } },
              ],
            },
          ],
        },
      ],
    },
    raw: true,
  });

  return chatData;
};

module.exports = { searchChat };
