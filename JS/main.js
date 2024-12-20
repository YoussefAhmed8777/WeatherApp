async function getData(){
  let res = await fetch ("https://api.weatherapi.com/v1/forecast.json?q=cairo&days=3&key=bc1qre8jdw2azrg6tf49wmp652w00xltddxmpk98xp");
  console.log(res);
  let data= await res.json();
  console.log(data);
  
}

getData()