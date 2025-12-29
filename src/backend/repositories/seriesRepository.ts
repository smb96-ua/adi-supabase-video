import { supabase } from '../config/supabase'

const TABLE = 'series'

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
    created_at?: string
    updated_at?: string
}

interface GetOptions {
    sort?: string
    filter?: string
}

async function getSeries(options: GetOptions = {}): Promise<Serie[]> {
    let query = supabase.from(TABLE).select('*')

    // Ordenación (por defecto: más recientes primero)
    const sortField = options.sort?.replace('-', '') || 'created_at'
    const ascending = options.sort ? !options.sort.startsWith('-') : false
    query = query.order(sortField, { ascending })

    const { data, error } = await query
    if (error) throw error
    return data || []
}

async function getSerie(id: string): Promise<Serie> {
    const { data, error } = await supabase
        .from(TABLE)
        .select('*')
        .eq('id', id)
        .single()
    if (error) throw error
    return data
}

async function addSerie(serieData: Partial<Serie>): Promise<Serie> {
    const { data, error } = await supabase
        .from(TABLE)
        .insert(serieData)
        .select()
        .single()
    if (error) throw error
    return data
}

async function updateSerie(id: string, serieData: Partial<Serie>): Promise<Serie> {
    const { data, error } = await supabase
        .from(TABLE)
        .update(serieData)
        .eq('id', id)
        .select()
        .single()
    if (error) throw error
    return data
}

async function deleteSerie(id: string): Promise<void> {
    const { error } = await supabase
        .from(TABLE)
        .delete()
        .eq('id', id)
    if (error) throw error
}

async function searchSeries(query: string): Promise<Serie[]> {
    if (!query || query.trim() === '') {
        return await getSeries()
    }

    // Búsqueda con ilike (case-insensitive) en múltiples campos
    const { data, error } = await supabase
        .from(TABLE)
        .select('*')
        .or(`titulo.ilike.%${query}%,descripcion.ilike.%${query}%,genero.ilike.%${query}%,creador.ilike.%${query}%`)
        .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
}

function subscribeToSeries(callback: (data: any) => void): () => void {
    const channel = supabase
        .channel('series-changes')
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

export { getSeries, getSerie, addSerie, updateSerie, deleteSerie, searchSeries, subscribeToSeries }
