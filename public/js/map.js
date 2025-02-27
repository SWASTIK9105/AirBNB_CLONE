maptilersdk.config.apiKey = mapToken;
const map = new maptilersdk.Map({
    container: 'map', 
    style: `https://api.maptiler.com/maps/streets/style.json?key=${mapToken}`,
    center: listing.coordinates,
    zoom: 14
});
new maptilersdk.Marker({ color: "red" }).setLngLat(listing.coordinates).addTo(map);
const popup = new maptilersdk.Popup({ offset: 25 })
    .setLngLat(listing.coordinates)
    .setHTML(`<h6>${listing.location}</h6><p>Exact location will be provided after booking.</p>`)
    .addTo(map);

   