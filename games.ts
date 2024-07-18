#!/usr/bin/env ts-node

import games from './games.json';

const { ongoing, playing, upcoming, ...years } = games;

type Item = {
  image: string;
  name: string;
  url: string;
  platform: string[];
  review: string;
  date: string;
  completed: boolean;
  note?: string;
};

const drawTable = (title: string, data: Item[]) => {
  const output: string[] = [];

  output.push(`## ${title}\n`);

  if (data.length) {
    output.push(
      `| Cover Art | Name | Platform | Review Score | Date | Completed |`
    );
    output.push(
      `| :-------: | ---- | :--------: | :----------: | :--: | :-------: |`
    );

    data.map((item) => {
      output.push(
        `| ${[
          item.image ? `<img src="${item.image}" height="100" />` : '',
          `[${item.name}](${item.url})`,
          item.platform.join('/'),
          item.review || '-',
          item.date || '-',
          item.completed ? '✅' : '-',
        ].join(' | ')} |`
      );
    });

    const notes = data
      .filter((item) => item.note)
      .map((item) => `**${item.name}** - ${item.note}`);

    if (notes.length) {
      output.push(`### Notes\n`);

      notes.map((note) => {
        output.push(`- ${note}`);
      });
    }
  } else {
    output.push('No games recorded for this section.');
  }

  return `${output.join('\n')}\n`;
};

console.log(`# Games I've Played

> A chronicling of the games I played each year.\n`);

console.log(drawTable('Ongoing', ongoing as Item[]));

console.log(drawTable('Currently Playing', playing as Item[]));

console.log(drawTable('Upcoming', upcoming as Item[]));

Object.keys(years)
  .reverse()
  .map((year) => {
    console.log(drawTable(year, games[year] as Item[]));
  });

console.log(`## Legend

| Emoji | Description                                      |
| :---: | ------------------------------------------------ |
|  ⭐️  | Loved the game                                   |
|  🍿   | Liked the game, keep coming back to it           |
| 🙋‍♂️🙋‍♂️  | Liked the game, playing it casually with friends |
|  🥱   | Got bored                                        |
|  👎   | Didn't like it                                   |
|  🚪   | Gave up                                          |`);
