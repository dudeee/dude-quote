import unirest from 'unirest';

export default bot => {
  let data = bot.data.quote;

  bot.agenda.define('quote', (job, done) => {
    unirest.get('http://api.theysaidso.com/qod.json').end(response => {
      if (!response.body.contents) return;

      let quote = response.body.contents.quotes[0];
      let message = quote.quote + ` _–${quote.author}_`;
      bot.sendMessage(data.target, message);

      done();
    });
  });

  bot.agenda.on('ready', () => {
    bot.agenda.every(data.every, 'quote');
  })
}
