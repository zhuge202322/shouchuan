async function debug() {
  try {
    const res = await fetch('http://43.165.68.39/wp-json/wc/store/products/69');
    const data = await res.json();
    console.log(JSON.stringify(data.categories, null, 2));
  } catch (e) {
    console.error(e);
  }
}

debug();
