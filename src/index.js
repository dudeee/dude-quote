import unirest from 'unirest';

export default bot => {
  let config = bot.config.quote;

  bot.schedule.scheduleJob('0 0 9 * * * *', (job, done) => {
    unirest.get('http://api.theysaidso.com/qod.json').end(response => {
      if (!response.body.contents) return;

      let quote = response.body.contents.quotes[0];
      let message = quote.quote + ` _–${quote.author}_`;
      bot.sendMessage(config.target, message);

      done();
    });
  });
}
