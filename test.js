fetch('http://82.29.175.72:3002/inventory/counts').then(r=>r.json()).then(d=>console.log(JSON.stringify(d, null, 2))).catch(e=>console.error(e))
