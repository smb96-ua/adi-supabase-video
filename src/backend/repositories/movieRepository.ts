import { pb } from '../config/pb'

const COLLECTION = 'movies'

export interface Movie {
    id?: string
    titulo: string
    descripcion: string
    genero: string
    anio: number
    valoracion?: number
    duracion?: number
    director?: string
    poster?: string
    trailer?: string
    created?: string
    updated?: string
}

interface GetOptions {
    sort?: string
    filter?: string
}

async function getMovies(options: GetOptions = {}): Promise<Movie[]> {
    return await pb.collection(COLLECTION).getFullList({
        sort: options.sort || '-created',
        filter: options.filter || ''
    })
}

async function getMovie(id: string): Promise<Movie> {
    return await pb.collection(COLLECTION).getOne(id)
}

async function addMovie(movieData: Partial<Movie>): Promise<Movie> {
    return await pb.collection(COLLECTION).create(movieData)
}

async function updateMovie(id: string, movieData: Partial<Movie>): Promise<Movie> {
    return await pb.collection(COLLECTION).update(id, movieData)
}

async function deleteMovie(id: string): Promise<void> {
    await pb.collection(COLLECTION).delete(id)
}

async function searchMovies(query: string): Promise<Movie[]> {
    if (!query || query.trim() === '') {
        return await getMovies()
    }
    return await pb.collection(COLLECTION).getFullList({
        filter: `titulo ~ "${query}" || descripcion ~ "${query}" || genero ~ "${query}" || director ~ "${query}"`,
        sort: '-created'
    })
}

function subscribeToMovies(callback: (data: any) => void): () => void {
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

export { getMovies, getMovie, addMovie, updateMovie, deleteMovie, searchMovies, subscribeToMovies }
