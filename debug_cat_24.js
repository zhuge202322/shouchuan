async function debug() {
  try {
    // Energy Cleansing ID seems to be 24 based on previous file read
    const res = await fetch('http://43.165.68.39/wp-json/wc/store/products?category=24');
    const data = await res.json();
    console.log("Count:", data.length);
    data.forEach(p => console.log(p.id, p.name));
  } catch (e) {
    console.error(e);
  }
}

debug();
