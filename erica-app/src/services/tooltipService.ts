// configure l'affichage de la date dans le tooltype du slider
export function getformatTooltip(val: number, geojsonData: any[]): string {
    if (geojsonData.length > 0) {
        return new Date(geojsonData[Math.round(val)]["properties"]["ISO_TIME"]).toLocaleString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }
    return '';
}
