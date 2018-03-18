var express = require('express');
var router = express.Router();

const TeleBot = require('telebot');
const bot = new TeleBot('531558266:AAGYSAmhTlhigc2m_s4VChOk5_s-VUTCa8s');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TrackMasterBot' });
});

//bot.on('text', (msg) => msg.reply.text(msg.text)); // echoes the message sent by user

/* /track command tells user where product is currently located */
bot.on([/^\/track (.+)$/, '/track productName'], (msg, props) => {
  const productName = props.match[1];
  const text = productName + ' is currently at San Francisco, CA 94132!';
  return bot.sendMessage(msg.from.id, text) + bot.sendLocation(msg.from.id, [37.7265802, -122.4907688]); 
});

bot.on([/^\/temperature (.+)$/, '/temperature productName'], (msg, props) => {
  const productName = props.match[1];
  const text = productName + ' is at 90 °Fahrenheit!';
  return bot.sendMessage(msg.from.id, text);
});

bot.on([/^\/time (.+)$/, '/time productName'], (msg, props) => {
  const productName = props.match[1];
  const text = productName + '\'s estimated time of arrivial: September 22, 2024!';
  return bot.sendMessage(msg.from.id, text);
});

bot.start();

module.exports = router;
