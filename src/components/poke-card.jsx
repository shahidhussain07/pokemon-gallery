import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const typeColors = {
	normal: "bg-stone-400",
	fire: "bg-orange-500",
	water: "bg-blue-500",
	electric: "bg-yellow-400",
	grass: "bg-green-500",
	ice: "bg-cyan-300",
	fighting: "bg-red-700",
	poison: "bg-purple-500",
	ground: "bg-amber-600",
	flying: "bg-indigo-300",
	psychic: "bg-pink-500",
	bug: "bg-lime-500",
	rock: "bg-yellow-700",
	ghost: "bg-purple-700",
	dragon: "bg-indigo-700",
	dark: "bg-stone-700",
	steel: "bg-slate-400",
	fairy: "bg-pink-300",
}

export const PokeCard = ({ pokemon }) => {
	return (
		<Card className="overflow-hidden transition-all hover:shadow-lg">
			<CardHeader className="p-4 pb-2 bg-[#f5f5f546]">
				<div className="flex justify-between items-start">
					<div>
						<h2 className="text-lg font-bold capitalize">
							{pokemon.name}
						</h2>
						<p className="text-sm text-[#737373]">
							#{pokemon.id.toString().padStart(3, "0")}
						</p>
					</div>
					<div className="flex gap-1">
						{pokemon.types.map(type => (
							<Badge
								key={type.type.name}
								className={`${
									typeColors[type.type.name] || "bg-gray-500"
								} text-white`}>
								{type.type.name}
							</Badge>
						))}
					</div>
				</div>
			</CardHeader>
			<CardContent className="p-4 pt-2 flex justify-center">
				<img
					src={
						pokemon.sprites.other["official-artwork"]
							.front_default || pokemon.sprites.front_default
					}
					alt={`${pokemon.name}`}
					className="h-40 w-40 object-contain"
					loading="lazy"
				/>
			</CardContent>
		</Card>
	)
}
