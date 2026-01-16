async function debug() {
  try {
    const res = await fetch('http://43.165.68.39/wp-json/wc/store/products?category=27');
    const data = await res.json();
    console.log("Count:", data.length);
    if(data.length > 0) {
        console.log("First product ID:", data[0].id);
    }
  } catch (e) {
    console.error(e);
  }
}

debug();
