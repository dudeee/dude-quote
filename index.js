import unirest from 'unirest';

export default bot => {
  bot.agenda.define('quote', (job, done) => {
    unirest.get('http://api.theysaidso.com/qod.json').end(response => {
      if (!response.body.contents) return;

      let quote = response.body.contents.quotes[0];
      let message = quote.quote + ` _–${quote.author}_`;
      bot.sendMessage('test-bolt', message);

      done();
    });
  });

  let job = bot.agenda.create('quote');

  job.repeatAt('at 9:30am');

  bot.agenda.on('complete', function(job) {
    console.log("Job %s finished", job.attrs.name);
  });
  bot.agenda.on('start', function(job) {
    console.log("Job %s started", job.attrs.name);
  });

  job.save();

  bot.agenda.start();
}
