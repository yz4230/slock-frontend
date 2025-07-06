import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { invariant } from "es-toolkit";
import {
	BellIcon,
	BookmarkIcon,
	HomeIcon,
	MessagesSquareIcon,
	PlusIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { $api } from "@/lib/api";
import { authStore } from "@/store/auth";
import CreateChannelDialog from "./-components/CreateChannelDialog";

export const Route = createFileRoute("/_guard/")({
	component: App,
});

type SidebarItem = {
	label: string;
	icon: ReactNode;
};

const sidebarItems: SidebarItem[] = [
	{
		label: "Home",
		icon: <HomeIcon />,
	},
	{
		label: "DMs",
		icon: <MessagesSquareIcon />,
	},
	{
		label: "Activity",
		icon: <BellIcon />,
	},
	{
		label: "Later",
		icon: <BookmarkIcon />,
	},
];

function App() {
	const user = useStore(authStore, (state) => state.user);
	invariant(user, "User must be defined in _guard route");

	const channels = useQuery($api.queryOptions("get", "/list-channels"));

	return (
		<div className="flex items-stretch h-svh">
			<div className="w-16 flex flex-col items-center pt-2 border-r gap-2 bg-slate-300">
				{sidebarItems.map((item) => (
					<div key={item.label} className="flex flex-col items-center">
						<Button size="icon" variant="ghost">
							{item.icon}
						</Button>
						<span className="text-xs font-bold">{item.label}</span>
					</div>
				))}
			</div>
			<div className="border-r flex flex-col w-72 p-2 bg-slate-200">
				{channels.data?.items.map((channel) => (
					<Button
						key={channel.id}
						variant="ghost"
						className="justify-start px-4"
					>
						{`# ${channel.name}`}
					</Button>
				))}
				{channels.data?.items.length === 0 && (
					<div className="text-center text-sm text-muted-foreground">
						No channels found. Create one to start chatting!
					</div>
				)}
				<CreateChannelDialog>
					<Button variant="outline">
						<PlusIcon />
						<span>Create Channel</span>
					</Button>
				</CreateChannelDialog>
			</div>
			<div className="grow flex flex-col">
				<div className="border-b p-4">
					<div className="flex items-baseline gap-4">
						<h1 className="text-2xl font-bold"># Awesome Channel</h1>
						<div className="text-muted-foreground">
							channel description goes here
						</div>
					</div>
				</div>
				<div className="grow px-4">Threads</div>
				<div className="p-4">
					<div className="border rounded-md min-h-20 p-4 bg-slate-50">
						Input
					</div>
				</div>
			</div>
		</div>
	);
}
