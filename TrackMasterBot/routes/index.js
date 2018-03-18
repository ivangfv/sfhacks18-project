var express = require('express');
var router = express.Router();

const TeleBot = require('telebot');
const bot = new TeleBot('531558266:AAGYSAmhTlhigc2m_s4VChOk5_s-VUTCa8s');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TrackMasterBot' });
});

//bot.on('text', (msg) => msg.reply.text(msg.text)); // echoes the message sent by user

/* /track command tells user where product is currently located with maps */
bot.on([/^\/track (.+)$/, '/track productName'], (msg, props) => {
  const productName = props.match[1];
  const text = productName + ' is currently at San Francisco, CA 94132!';
  return bot.sendMessage(msg.from.id, text) + bot.sendLocation(msg.from.id, [37.7265802, -122.4907688]); 
  //return bot.sendMessage(msg.from.id, text) + bot.sendPhoto(msg.from.id, 'https://www.google.com/maps/dir/singapore/san+francisco/@15.461773,131.8116818,3z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x31da11238a8b9375:0x887869cf52abf5c4!2m2!1d103.819836!2d1.352083!1m5!1m1!1s0x80859a6d00690021:0x4a501367f076adff!2m2!1d-122.4194155!2d37.7749295');
});

/* /temperature command tells user current temperature of the product */
bot.on([/^\/temperature (.+)$/, '/temperature productName'], (msg, props) => {
  const productName = props.match[1];
  const text = productName + ' is at 90 °Fahrenheit!';
  return bot.sendMessage(msg.from.id, text) + bot.sendPhoto(msg.from.id, 'https://www.amcharts.com/demos/date-based-line-chart/?theme=dark');
});

/* /time command tells user ETA of the product */
bot.on([/^\/time (.+)$/, '/time productName'], (msg, props) => {
  const productName = props.match[1];
  const text = productName + '\'s estimated time of arrivial: September 22, 2024!';
  return bot.sendMessage(msg.from.id, text);
});

bot.start();

module.exports = router;
