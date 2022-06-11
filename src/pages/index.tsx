/* eslint-disable @next/next/no-img-element */
import { getOptionsForVote } from '@/utils/getRandomPokemon';
import { trpc } from '@/utils/trpc';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useMemo, useState } from 'react';

const btn =
	'focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900';

const Home: NextPage = () => {
	const [ids, updateIds] = useState(() => getOptionsForVote());
	const [first, second] = ids;

	const firstPokemon = trpc.useQuery(['get-pokemon-by-id', { id: first }]);
	const secondPokemon = trpc.useQuery(['get-pokemon-by-id', { id: second }]);

	if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

	const voteForRoundest = (selected: number) => {
		updateIds(getOptionsForVote());
	};
	return (
		<div className="h-screen w-screen flex flex-col justify-center items-center ">
			<div className="text-center">Which pokemon is rounder</div>
			<div className="p-2" />
			<div className="border rounded p-8 flex justify-between max-w-2xl items-center">
				<div className="w-64 h-64 flex flex-col items-center">
					{firstPokemon && (
						<img
							src={firstPokemon.data?.sprites.front_default!}
							alt="first"
							className="w-full mt-[-2rem]"
						/>
					)}
					<div className="text-xl text-center capitalize mt-[-1rem]">
						{firstPokemon.data?.name}
					</div>
					<button className={btn} onClick={() => voteForRoundest(first)}>
						Rounder
					</button>
				</div>
				<div className="p-8">Vs</div>
				<div className="w-64 h-64 flex flex-col items-center">
					{secondPokemon && (
						<img
							src={secondPokemon.data?.sprites.front_default!}
							alt="second"
							className="w-full mt-[-2rem]"
						/>
					)}
					<div className="text-xl text-center capitalize mt-[-1rem]">
						{secondPokemon.data?.name}
					</div>
					<button className={btn} onClick={() => voteForRoundest(second)}>
						Rounder
					</button>
				</div>
				<div className="p-2" />
			</div>
		</div>
	);
};

export default Home;
