import { supabase } from '../config/supabase'

const TABLE = 'movies'

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
    created_at?: string
    updated_at?: string
}

interface GetOptions {
    sort?: string
    filter?: string
}

async function getMovies(options: GetOptions = {}): Promise<Movie[]> {
    let query = supabase.from(TABLE).select('*')

    // Ordenación (por defecto: más recientes primero)
    const sortField = options.sort?.replace('-', '') || 'created_at'
    const ascending = options.sort ? !options.sort.startsWith('-') : false
    query = query.order(sortField, { ascending })

    const { data, error } = await query
    if (error) throw error
    return data || []
}

async function getMovie(id: string): Promise<Movie> {
    const { data, error } = await supabase
        .from(TABLE)
        .select('*')
        .eq('id', id)
        .single()
    if (error) throw error
    return data
}

async function addMovie(movieData: Partial<Movie>): Promise<Movie> {
    const { data, error } = await supabase
        .from(TABLE)
        .insert(movieData)
        .select()
        .single()
    if (error) throw error
    return data
}

async function updateMovie(id: string, movieData: Partial<Movie>): Promise<Movie> {
    const { data, error } = await supabase
        .from(TABLE)
        .update(movieData)
        .eq('id', id)
        .select()
        .single()
    if (error) throw error
    return data
}

async function deleteMovie(id: string): Promise<void> {
    const { error } = await supabase
        .from(TABLE)
        .delete()
        .eq('id', id)
    if (error) throw error
}

async function searchMovies(query: string): Promise<Movie[]> {
    if (!query || query.trim() === '') {
        return await getMovies()
    }

    // Búsqueda con ilike (case-insensitive) en múltiples campos
    const { data, error } = await supabase
        .from(TABLE)
        .select('*')
        .or(`titulo.ilike.%${query}%,descripcion.ilike.%${query}%,genero.ilike.%${query}%,director.ilike.%${query}%`)
        .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
}

function subscribeToMovies(callback: (data: any) => void): () => void {
    const channel = supabase
        .channel('movies-changes')
        .on(
            'postgres_changes',
            {
                event: '*',
                schema: 'public',
                table: TABLE
            },
            (payload) => {
                // Adaptar payload al formato esperado por la vista
                callback({
                    action: payload.eventType, // INSERT, UPDATE, DELETE
                    record: payload.new || payload.old
                })
            }
        )
        .subscribe()

    return () => {
        supabase.removeChannel(channel)
    }
}

export { getMovies, getMovie, addMovie, updateMovie, deleteMovie, searchMovies, subscribeToMovies }
