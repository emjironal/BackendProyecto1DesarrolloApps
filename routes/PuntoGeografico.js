class PuntoGeografico
{
    constructor(pLatidude, pLongitude)
    {
        this.latitude = pLatidude;
        this.longitude = pLongitude;
    }
    //Extraida de https://www.genbeta.com/desarrollo/como-calcular-la-distancia-entre-dos-puntos-geograficos-en-c-formula-de-haversine
    distancia(punto)
    {
        var radioTierra = 6378;
        var lat = this.toRadianes(this.latitude - punto.latitude);
        var lon = this.toRadianes(this.longitude - punto.longitude);
        var a = Math.pow(Math.sin(lat / 2), 2) + (Math.cos(this.toRadianes(punto.latitude)) * Math.cos(this.toRadianes(this.latitude)) * Math.pow(Math.sin(lon / 2), 2));
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var distancia = radioTierra * c;
        return distancia;
    }
    toRadianes(valor)
    {
        return (Math.PI / 180) * valor;
    }
}
module.exports = PuntoGeografico;