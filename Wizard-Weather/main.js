function init() {

  let NewsUpdater = setInterval(function() {
    getNews();
  }, 5000);
}
async function getNews() {
  let news = await fetch("https://newsdata.io/api/1/news?apikey=pub_57948053e449c05fe5824069406e7eabd464&q=news%20")
    .then(res => res.json())
    .then(json => json);
  convertNews(news);
}
