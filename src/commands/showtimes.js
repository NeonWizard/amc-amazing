const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

const { TableBuilder } = require('../tablebuilder.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('showtimes')
    .setDescription('Displays showtimes for today'),
  async execute(interaction) {
    const table = new TableBuilder([
      {
        width: 12,
        label: 'Start Time',
        index: 1,
        field: 'start_time',
      },
      {
        width: 12,
        label: 'End Time',
        index: 2,
        field: 'end_time',
      },
      {
        width: 42,
        label: 'Feature',
        index: 3,
        field: 'feature',
      },
      {
        width: 6,
        label: 'Aud',
        index: 4,
        field: 'auditorium',
      },
    ],
    {
      sortBy: ['start_time', 'feature'],
      sortDirection: 'asc',
    });

    table.addRows(
      {
        start_time: '11:00am',
        end_time: '1:30pm',
        feature: 'Balls 2',
        auditorium: '13'
      },
      {
        start_time: '11:25am',
        end_time: '11:55am',
        feature: 'Markiplier\'s 50th birthday showcase',
        auditorium: 1
      },
      {
        start_time: '11:45am',
        end_time: '5:00pm',
        feature: 'Paint Drying',
        auditorium: 3
      },
      {
        start_time: '2:00pm',
        end_time: '5:00pm',
        feature: 'Matrix: Resurrections Director\s Apology',
        auditorium: 4
      },
      {
        start_time: '5:05pm',
        end_time: '12:00am',
        feature: 'Paint Drying 2',
        auditorium: 10
      }
    )

    interaction.reply({ content: table.build() })
  }
};