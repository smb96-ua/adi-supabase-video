import { pb } from '../config/pb'

const COLLECTION = 'series'

export interface Serie {
    id?: string
    titulo: string
    descripcion: string
    genero: string
    anio: number
    valoracion?: number
    creador?: string
    poster?: string
    trailer?: string
    estado?: string
    created?: string
    updated?: string
}

interface GetOptions {
    sort?: string
    filter?: string
}

async function getSeries(options: GetOptions = {}): Promise<Serie[]> {
    return await pb.collection(COLLECTION).getFullList({
        sort: options.sort || '-created',
        filter: options.filter || ''
    })
}

async function getSerie(id: string): Promise<Serie> {
    return await pb.collection(COLLECTION).getOne(id)
}

async function addSerie(serieData: Partial<Serie>): Promise<Serie> {
    return await pb.collection(COLLECTION).create(serieData)
}

async function updateSerie(id: string, serieData: Partial<Serie>): Promise<Serie> {
    return await pb.collection(COLLECTION).update(id, serieData)
}

async function deleteSerie(id: string): Promise<void> {
    await pb.collection(COLLECTION).delete(id)
}

async function searchSeries(query: string): Promise<Serie[]> {
    if (!query || query.trim() === '') {
        return await getSeries()
    }
    return await pb.collection(COLLECTION).getFullList({
        filter: `titulo ~ "${query}" || descripcion ~ "${query}" || genero ~ "${query}" || creador ~ "${query}"`,
        sort: '-created'
    })
}

function subscribeToSeries(callback: (data: any) => void): () => void {
    // Deshabilitar realtime en producción (Cloudflare Tunnel no soporta WebSockets/SSE)
    if (import.meta.env.MODE === 'production') {
        console.log('🔕 Realtime deshabilitado en producción (usando Cloudflare Tunnel)')
        return () => {} // No-op function
    }
    
    try {
        pb.collection(COLLECTION).subscribe('*', callback).catch((error) => {
            console.error('❌ Error al subscribirse a realtime:', error)
        })
        return () => {
            try {
                pb.collection(COLLECTION).unsubscribe('*')
            } catch (error) {
                console.error('❌ Error al desubscribirse:', error)
            }
        }
    } catch (error) {
        console.error('❌ Realtime no disponible:', error)
        return () => {}
    }
}

export { getSeries, getSerie, addSerie, updateSerie, deleteSerie, searchSeries, subscribeToSeries }
