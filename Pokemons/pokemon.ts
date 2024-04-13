import { Move } from './move';

export interface Pokemon {
    pokemon_id: number;
    pokemon_name: string;
    pokemon_phrase: string;
    pokemon_weight: number;
    is_pokemon_active: boolean;
    pokemon_birthdate: Date;
    pokemon_url: string;
    pokemon_type: string;
    pokemon_abilities: string[];
    pokemon_move: Move;
}