import unirest from 'unirest';

export default bot => {
  const config = bot.config.quote;
  const channel = config.channel || 'general';
  const every = config.every || '0 0 9 * * * *';

  bot.schedule.scheduleJob(every, (job, done) => {
    unirest.get('http://api.theysaidso.com/qod.json').end(response => {
      if (!response.body.contents) {
        bot.log.error('[quote]', response.body);
        return;
      }

      let quote = response.body.contents.quotes[0];
      let message = quote.quote + ` _–${quote.author}_`;
      bot.sendMessage(channel, message);

      done();
    });
  });
}
