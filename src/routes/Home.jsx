import { Header } from "@/components/header"
import { PokeCard } from "@/components/poke-card"
import { PokeGrid } from "@/components/poke-grid"
import { Button } from "@/components/ui/button"
import React, { useEffect, useState } from "react"

export const Home = () => {
	const [pokemon, setPokemon] = useState([])
	const [filteredPokemon, setFilteredPokemon] = useState([])
	const [searchTerm, setSearchTerm] = useState("")
	const [selectedType, setSelectedType] = useState("all")
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [types, setTypes] = useState([])

	useEffect(() => {
		const fetchPokemonTypes = async () => {
			try {
				const response = await fetch("https://pokeapi.co/api/v2/type")
				const data = await response.json()
				setTypes(data.results.map(type => type.name))
			} catch (error) {
				console.error("Error fetching Pokémon types:", error)
			}
		}

		fetchPokemonTypes()
	}, [])

	useEffect(() => {
		const fetchPokemon = async () => {
			setLoading(true)
			try {
				const response = await fetch(
					"https://pokeapi.co/api/v2/pokemon?limit=150"
				)
				const data = await response.json()
				const pokemonDetails = await Promise.all(
					data.results.map(async pokemon => {
						const res = await fetch(pokemon.url)
						return await res.json()
					})
				)
				setPokemon(pokemonDetails)
				setFilteredPokemon(pokemonDetails)
				setLoading(false)
			} catch (err) {
				setError(
					"Failed to fetch Pokémon data. Please try again later."
				)
				setLoading(false)
			}
		}

		fetchPokemon()
	}, [])

	useEffect(() => {
		const filtered = pokemon.filter(p => {
			const matchesSearch = p.name
				.toLowerCase()
				.includes(searchTerm.toLowerCase())
			const matchesType =
				selectedType === "all" ||
				p.types.some(t => t.type.name === selectedType)
			return matchesSearch && matchesType
		})
		setFilteredPokemon(filtered)
	}, [searchTerm, selectedType, pokemon])

	const handleReset = () => {
		setSearchTerm("")
		setSelectedType("all")
	}

	return (
		<div className="min-h-screen bg-[#ffffff] relative">
			<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 overflow-hidden opacity-[0.03] flex items-center justify-center">
				<svg
					width="800"
					height="800"
					viewBox="0 0 800 800"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="w-[800px] h-[800px] min-w-[800px] min-h-[800px]">
					<circle cx="400" cy="400" r="400" fill="#FF1C1C" />
					<path
						d="M400 800C620.914 800 800 620.914 800 400H0C0 620.914 179.086 800 400 800Z"
						fill="white"
					/>
					<circle cx="400" cy="400" r="125" fill="white" />
					<circle
						cx="400"
						cy="400"
						r="50"
						stroke="black"
						strokeWidth="50"
					/>
				</svg>
			</div>

			<Header
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				selectedType={selectedType}
				setSelectedType={setSelectedType}
				types={types}
				handleReset={handleReset}
			/>

			<main className="container mx-auto px-4 py-8 relative z-1">
				{loading ? (
					<div className="flex flex-col items-center justify-center min-h-[50vh]">
						<p className="text-lg">Loading Pokémon...</p>
					</div>
				) : error ? (
					<div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
						<p className="text-lg text-red-500">{error}</p>
						<Button
							className="mt-4"
							onClick={() => window.location.reload()}>
							Try Again
						</Button>
					</div>
				) : filteredPokemon.length === 0 ? (
					<div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
						<p className="text-lg">
							No Pokémon found matching your search criteria.
						</p>
						<Button className="mt-4" onClick={handleReset}>
							Reset Filters
						</Button>
					</div>
				) : (
					<PokeGrid>
						{filteredPokemon.map(pokemon => (
							<PokeCard key={pokemon.id} pokemon={pokemon} />
						))}
					</PokeGrid>
				)}
			</main>
		</div>
	)
}
