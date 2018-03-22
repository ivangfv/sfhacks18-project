var express = require('express');
var router = express.Router();

const TeleBot = require('telebot');
const bot = new TeleBot('531558266:AAGYSAmhTlhigc2m_s4VChOk5_s-VUTCa8s');

var temperatureCountHack = 1;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TrackMasterBot' });
});

/* /help command tells us the available commands */
bot.on(['/help', '/h'], (msg) => {
  const helpMessage = '/track [productName] - informs user where product is currently located on the map. \n/temperature [productName] - informs user the temperature of the product. \n /time [productName] - informs user ETA of the product.'
  return bot.sendMessage(msg.from.id, helpMessage);
});

/* /track command tells user where product is currently located with maps */
bot.on([/^\/track (.+)$/, '/track productName'], (msg, props) => {
  const productName = props.match[1];
  const text = productName + ' is currently at San Francisco, CA 94132!';
  return bot.sendMessage(msg.from.id, text) + bot.sendLocation(msg.from.id, [37.7265802, -122.4907688]);  
});

/* /temperature command tells user current temperature of the product */
bot.on([/^\/temperature (.+)$/, '/temperature productName'], (msg, props) => {
  console.log(temperatureCountHack); //1
  if(temperatureCountHack == 1) {
    temperatureCountHack++;
    console.log(temperatureCountHack); //2
    return bot.sendPhoto(msg.from.id, 'https://i.imgur.com/N8yo1ea.png');
  } else if(temperatureCountHack == 2){
    temperatureCountHack--;
    console.log(temperatureCountHack); //1
    return bot.sendPhoto(msg.from.id, 'https://i.imgur.com/NojwgRI.png') + bot.sendPhoto(msg.from.id, 'https://i.imgur.com/KIqr7qo.png');
  }
});

/* /time command tells user ETA of the product */
bot.on([/^\/time (.+)$/, '/time productName'], (msg, props) => {
  const productName = props.match[1];
  const text = productName + '\'s estimated time of arrivial: September 22, 2024!';
  return bot.sendMessage(msg.from.id, text);
});

bot.start();

module.exports = router;
