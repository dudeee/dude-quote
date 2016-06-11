import NodePie from 'nodepie';
import unirest from 'unirest';

export default bot => {
  const config = bot.config.quote;
  const channel = config.channel || 'general';
  const every = config.every || '0 0 9 * * * *';

  bot.schedule.scheduleJob(every, () => {

    unirest.get('http://feeds.feedburner.com/brainyquote/QUOTEBR').end(response => {
      if (response.error) {
        bot.log.error('[quote]', response.error);
        return;
      }

      const parser = new NodePie(response.body);
      parser.init();

      let quote = parser.getItem(0).element;
      const attachments = [{
        fallback: `*Quote of the day*: ${quote.description} _–${quote.title}_`,
        color: '#C2E3DE',

        author_name: 'Quote of the day',
        author_link: quote.link,

        text: `${quote.description} _-${quote.title}_`,

        mrkdwn_in: ['text'],
      }];
      bot.sendMessage(channel, '', { attachments, websocket: false });
    });
  });
}
