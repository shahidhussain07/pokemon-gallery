import React from "react"
import { Input } from "./ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select"
import { Button } from "./ui/button"
import { Search } from "lucide-react"

export const Header = ({
	searchTerm,
	setSearchTerm,
	selectedType,
	setSelectedType,
	types,
	handleReset,
}) => {
	return (
		<header className="sticky top-0 z-10 bg-[#5ab290] text-[#fafafa] shadow-md">
			<div className="container mx-auto px-4 py-4">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
					<h1 className="text-2xl font-bold">
						<svg
							width="32"
							height="32"
							viewBox="0 0 800 800"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="w-8 h-8 inline-block mr-2 align-middle">
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
						</svg>{" "}
						Pokémon Gallery
					</h1>
					<div className="flex flex-col sm:flex-row gap-2 sm:items-center">
						<div className="relative">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#737373]" />
							<Input
								type="text"
								placeholder="Search Pokémon..."
								className="pl-8 bg-[#fafafa] text-black "
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
							/>
						</div>
						<div className="flex gap-2">
							<Select
								value={selectedType}
								onValueChange={setSelectedType}>
								<SelectTrigger className="w-[180px] bg-[#fafafa] text-[#171717]">
									<SelectValue placeholder="Filter by type" />
								</SelectTrigger>
								<SelectContent className=" bg-[#fafafa] text-[#171717]">
									<SelectItem value="all">
										All Types
									</SelectItem>
									{types.map(type => (
										<SelectItem key={type} value={type}>
											{type.charAt(0).toUpperCase() +
												type.slice(1)}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<Button
								variant="secondary"
								onClick={handleReset}
								className="bg-[#fafafa] text-[#171717] hover:bg-[#fafafa]/90">
								Reset
							</Button>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}
