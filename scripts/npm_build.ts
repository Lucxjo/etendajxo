#!/usr/bin/env -S deno run --allow-env --allow-read --allow-write --allow-net
import { build, emptyDir } from 'dnt/mod.ts';

await emptyDir('./npm');

await build({
	entryPoints: ['./mod.ts'],
	outDir: './npm',
	shims: {
		// see JS docs for overview and more options
		deno: true,
	},
	package: {
		// package.json properties
		name: 'etendajxo',
		version: Deno.args[0],
		description: 'Extensions for Deno/Node',
		license: 'GPL-3.0',
		repository: {
			type: 'git',
			url: 'git+https://github.com/Lucxjo/etendajxo.git',
		},
		bugs: {
			url: 'https://github.com/Lucxjo/etendajxo/issues',
		},
	},
});

// post build steps
Deno.copyFileSync('LICENSE', 'npm/LICENSE');
Deno.copyFileSync('README.md', 'npm/README.md');
