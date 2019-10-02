import deepMerge from './deepMerge';

export default function createDerivedTheme (themeDef) {
	themeDef = themeDef?.length ? themeDef : [themeDef];

	return themeDef.reduce((themeDef = {}, xformer) =>
		deepMerge(
			typeof xformer == "function" ? 
			xformer(themeDef) : xformer,
			themeDef
		), {}
	);
}