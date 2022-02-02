const { SlashCommandBuilder } = require('@discordjs/builders');
// const axios = require('axios');

const { TableBuilder } = require('../tablebuilder.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('showtimes')
    .setDescription('Displays showtimes for today')
    .addStringOption(option =>
      option
        .setName('type')
        .setDescription('The type of showtime schedule to output.')
        .addChoice('default', 'default')
        .addChoice('full', 'full')
        .addChoice('usher', 'usher')),
  async execute(interaction) {
    const type = interaction.options.getString('type')?.toLowerCase();

    const startColumn = {
      width: 10,
      label: 'Start',
      index: 1,
      field: 'start_time',
    };
    const endColumn = {
      width: 10,
      label: 'End',
      index: 2,
      field: 'end_time',
    };
    const featureColumn = {
      width: 42,
      label: 'Feature',
      index: 3,
      field: 'feature',
    };
    const audColumn = {
      width: 5,
      label: 'Aud',
      index: 4,
      field: 'auditorium',
    };
    const peopleColumn = {
      width: 9,
      label: 'Tickets',
      index: 5,
      field: 'people',
    };

    const options = {
      sortBy: ['start_time', 'feature'],
      sortDirection: 'asc',
    };
    let columns = [];

    if (type == 'full') {
      columns = [startColumn, endColumn, featureColumn, peopleColumn, audColumn];
      await interaction.reply('Fetching full schedule. Please be patient :)');
    }
    else if (type == 'usher') {
      endColumn.index = 1;
      startColumn.index = 2;
      options.sortBy = ['end_time', 'feature'];
      columns = [endColumn, startColumn, featureColumn, peopleColumn, audColumn];
      await interaction.reply('Fetching usher schedule. Please be patient :)');
    }
    else {
      columns = [startColumn, endColumn, peopleColumn];
      await interaction.reply('Fetching default schedule. Please be patient :)');
    }

    const table = new TableBuilder(columns, options);

    // -----------------------------------------------------------------------
    // AXIOS fetch from AMC API
    await new Promise(resolve => setTimeout(resolve, 3000));

    table.addRows(
      {
        start_time: '11:00am',
        end_time: '1:30pm',
        feature: 'Balls 2',
        auditorium: '13',
        people: 69,
      },
      {
        start_time: '11:25am',
        end_time: '11:55am',
        feature: 'Markiplier\'s 50th birthday showcase',
        auditorium: 1,
        people: 0,
      },
      {
        start_time: '11:45am',
        end_time: '5:00pm',
        feature: 'Paint Drying',
        auditorium: 3,
        people: 120,
      },
      {
        start_time: '2:00pm',
        end_time: '5:00pm',
        feature: 'Matrix: Resurrections Director\'s Apology',
        auditorium: 4,
        people: 999,
      },
      {
        start_time: '5:05pm',
        end_time: '12:00am',
        feature: 'Paint Drying 2',
        auditorium: 10,
        people: 153,
      },
    );

    await interaction.followUp({ content: table.build() });
  },
};