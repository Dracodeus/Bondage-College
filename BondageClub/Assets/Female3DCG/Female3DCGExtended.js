"use strict";

/**
 * Female3DCGExtended.js
 * ---------------------
 * This file contains definitions and configuration for extended items. Items which are marked as Extended in
 * `Female3DCG.js` and which have an extended item definition here will have their load/draw/click functions
 * _automatically_ created when assets are loaded, saving the need for an individual extended item script.
 *
 * Currently, modular and typed items are supported, and this is likely to expand in the future.
 */

/**
 * An enum encapsulating the available extended item archetypes
 * MODULAR - Indicates that this item is modular, with several independently configurable modules
 * @enum {string}
 * @see {@link ModularItemConfig}
 * @see {@link TypedItemConfig}
 */
const ExtendedArchetype = {
	MODULAR: "modular",
	TYPED: "typed",
};

/**
 * An object containing all extended item configurations.
 * @const {ExtendedItemConfig}
 */
var AssetFemale3DCGExtended = {
	ClothAccessory: {
		LeatherStraps: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemArms", AssetName: "LeatherArmbinder" },
			Config: {
				Options: [
					{
						Name: "WrapStrap",
						Property: { Type: null, },
					},
					{
						Name: "Strap",
						Property: { Type: "Strap", },
					},
				],		
			},
		}, // LeatherStraps
	}, // ClothAccessory
	ItemArms: {
		HighSecurityStraitJacket: {
			Archetype: ExtendedArchetype.MODULAR,
			Config: {
				Modules: [
					{
						Name: "Crotch", Key: "c",
						Options: [
							{}, // c0 - No crotch panel
							{ // c1 - Crotch panel
								Property: {
									Difficulty: 1,
									Block: ["ItemPelvis", "ItemVulva", "ItemVulvaPiercings", "ItemButt"],
									Hide: ["ItemVulva", "ItemVulvaPiercings"],
									HideItem: ["ItemButtAnalBeads2"],
								},
							},
						],
					},
					{
						Name: "Arms", Key: "a",
						Options: [
							{}, // a0 - Arms loose
							{ Property: { Difficulty: 2 }, SelfBondageLevel: 8 }, // a1 - Arms in front
							{ Property: { Difficulty: 3 }, SelfBondageLevel: 8 }, // a2 - Arms behind
						],
					},
					{
						Name: "Straps", Key: "s",
						Options: [
							{}, // s0 - No crotch straps
							{ // s1 - One crotch strap
								Property: {
									Difficulty: 1,
									Block: ["ItemPelvis", "ItemVulva", "ItemVulvaPiercings", "ItemButt"],
									Hide: ["ItemVulvaPiercings"],
									HideItem: ["ItemButtAnalBeads2"],
								},
							},
							{ Property: { Difficulty: 2, Block: ["ItemPelvis"] } }, // s2 - Two crotch straps
							{ // s3 - Three crotch straps
								Property: {
									Difficulty: 2,
									Block: ["ItemPelvis", "ItemVulva", "ItemVulvaPiercings", "ItemButt"],
									Hide: ["ItemVulvaPiercings"],
									HideItem: ["ItemButtAnalBeads2"],
								},
							},
						],
					},
				],
				ChangeWhenLocked: false,
			},
		}, // HighSecurityStraitJacket
		LatexButterflyLeotard: {
			Archetype: ExtendedArchetype.TYPED,
			Config: {
				Options: [
					{
						Name: "Unpolished",
						Property: { Type: null },
					},
					{
						Name: "Polished",
						Property: { Type: "Polished" },
					},
				],
				Dialog: {
					Load: "ItemArmsLatexLeotardSelect",
					TypePrefix: "ItemArmsLatexLeotard",
					ChatPrefix: "ItemArmsLatexLeotardSet",
				},
			},
		}, // LatexButterflyLeotard
		LatexBoxtieLeotard: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { AssetName: "LatexButterflyLeotard" },
		},
		LatexSleevelessLeotard: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { AssetName: "LatexButterflyLeotard" },
		},
		CeilingShackles: {
			Archetype: ExtendedArchetype.TYPED,
			Config: {
				ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR],
				Options: [
					{
						Name: "HeadLevel",
						Property: {
							Type: null,
							SetPose: ["Yoked"]
						},
					},
					{
						Name: "Overhead",
						Property: {
							Type: "Overhead",
							SetPose: ["OverTheHead"]
						},
					},
				],
				Dialog: {
					Load: "SelectBondagePosition",
					ChatPrefix: ({ C }) => `ItemArmsCeilingShacklesSet${C.Pose.includes("Suspension") ? "Suspension" : ""}`
				},
			},
		}, // CeilingShackles
		SteelCuffs: {
			Archetype: ExtendedArchetype.TYPED,
			Config: {
				Options: [
					{
						Name: "None",
						Property: { Type: null }
					},
					{
						Name: "Wrist",
						Property: {
							Type: "Wrist",
							Effect: ["Block", "Prone"],
							SetPose: ["BackBoxTie"]
						}
					}
				],
				Dialog: {
					Load: "SelectBondagePosition"
				}
			}
		}, // SteelCuffs
		BitchSuit: {
			Archetype: ExtendedArchetype.TYPED,
			Config: {
				Options: [
					{
						Name: "Latex",
						Property: {
							Type: null,
							Block: ["ItemBreast", "ItemNipples", "ItemNipplesPiercings", "ItemVulva", "ItemVulvaPiercings", "ItemButt"],
						},
					},
					{
						Name: "UnZip",
						Property: {
							Type: "UnZip",
							Block: [],
						},
					},
				],
			},
		}, // BitchSuit
		LeatherArmbinder: {
			Archetype: ExtendedArchetype.TYPED,
			Config: {
				Options: [
					{
						Name: "None",
						Property: { Type: null, Difficulty: 0 },
					},
					{
						Name: "Strap",
						Property: { Type: "Strap", Difficulty: 3 },
					},
					{
						Name: "WrapStrap",
						Property: { Type: "WrapStrap", Difficulty: 3 },
					},
				],
				Dialog: {
					Load: "ItemArmsLeatherArmbinderSelect",
					TypePrefix: "ItemArmsLeatherArmbinder",
					ChatPrefix: "ItemArmsLeatherArmbinderSet",
				},
			},
		}, // LeatherArmbinder
		SturdyLeatherBelts: {
			Archetype: ExtendedArchetype.TYPED,
			Config: {
				ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR],
				ChangeWhenLocked: false,
				Dialog: {
					Load: "SturdyLeatherBeltsSelectTightness",
					TypePrefix: "SturdyLeatherBeltsPose",
					ChatPrefix: "SturdyLeatherBeltsRestrain",
				},
				Options: [
					{
						Name: "One",
						Property: { Type: null, },
					},
					{
						Name: "Two",
						Property: { Type: "Two", Difficulty: 2, },
					},
					{
						Name: "Three",
						Property: { Type: "Three", Difficulty: 4, },
					},
				],
			}
		}, // SturdyLeatherBelts
	}, // ItemArms
	ItemNeck: {
		ShinySteelCollar: {
			Archetype: ExtendedArchetype.TYPED,
			Config: {
				Options: [
					{ Name: "NoRing", Property: { Type: null } },
					{ Name: "Ring", Property: { Type: "Ring" } }
				],
				DrawImages: false
			}
		} // ShinySteelCollar
	}, // ItemNeck
	ItemHood: {
		KirugumiMask: {
			Archetype: ExtendedArchetype.MODULAR,
			Config: {
				ChatSetting: ModularItemChatSetting.PER_MODULE,
				Modules: [
					{
						Name: "Eyes", Key: "e",
						Options: [{}, {}, {}, {}], // All options are merely cosmetic
					},
					{
						Name: "Mouth", Key: "m",
						Options: [{}, {}, {}, {}], // All options are merely cosmetic,
					},
					{
						Name: "Blush", Key: "b",
						Options: [{}, {}, {}, {}], // All options are merely cosmetic,
					},
					{
						Name: "Brows", Key: "br",
						Options: [{}, {}, {}, {}], // All options are merely cosmetic,
					},
					{
						Name: "Opacity", Key: "op",
						Options: [
							{},
							{
								Property: {
									Effect: ["BlindLight"],
								},
							},
							{
								Property: {
									Effect: ["BlindHeavy", "Prone"],
								},
							}
						], // Opacity
					},
				],
				ChangeWhenLocked: false,
			},
		}, // KirugumiMask
	}, // ItemHood
	ItemDevices: {
		Crib: {
			Archetype: ExtendedArchetype.MODULAR,
			Config: {
				Modules: [
					{
						Name: "Gate", Key: "g",
						Options: [
							{}, // g0 - Gate open
							{ Property: { Difficulty: 15 } }, // g1 - Gate closed
						],
					},
					{
						Name: "Plushies", Key: "p",
						Options: [
							{}, // p0 - No plushies
							{}, // p1 - Plushies
						],
					},
				],
			},
		}, // Crib
	}, // ItemDevices
	Corset: {
		LatexCorset1: {
			Archetype: ExtendedArchetype.TYPED,
			Config: {
				Options: [
					{
						Name: "Garter",
						Property: { Type: null },
					},
					{
						Name: "NoGarter",
						Property: { Type: "Garterless" },
					},
				],
				Dialog: {
					Load: "LatexCorset1Select",
					TypePrefix: "LatexCorset1",
					ChatPrefix: "LatexCorset1Set",
				},
			},
		}, // LatexCorset1
	}, // Corset
	ItemTorso: {
		LatexCorset1: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "Corset", AssetName: "LatexCorset1" },
		}, //LatexCorset1
		SilkStraps: {
			Archetype: ExtendedArchetype.TYPED,
			Config: {
				Options: [
					{ Name: "Crotch", Property: { Type: null } },
					{ Name: "Waist", Property: { Type: "Waist" } },
					{ Name: "Harness", Property: { Type: "Harness" } },
					{ Name: "Star", Property: { Type: "Star" } },
					{ Name: "Diamond", Property: { Type: "Diamond" } },
				]				
			},
		}, // SilkStraps
	}, // ItemTorso
	HairAccessory1: {
		ElfEars: {
			Archetype: ExtendedArchetype.TYPED,
			Config: {
				Options: [
					{
						Name: "InFront",
						Property: { Type: null },
					},
					{
						Name: "Behind",
						Property: { Type: "Behind", OverridePriority: 51 },
					},
				],
				Dialog: {
					Load: "HairAccessory1ElfEarsSelect",
					TypePrefix: "HairAccessory1ElfEars",
				},
			}
		} // ElfEars
	}, // HairAccessory1
	HairAccessory2: {
		ElfEars: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "HairAccessory1", AssetName: "ElfEars" },
		},
	}, // HairAccessory2
	ItemMouth: {
		ClothGag: {
			Archetype: ExtendedArchetype.TYPED,
			Config: {
				Options: [
					{
						Name: "Small",
						Property: {
							Type: null,
							Effect: ["BlockMouth", "GagVeryLight"],
						},
					},
					{
						Name: "Cleave",
						Property: {
							Type: "Cleave",
							Effect: ["BlockMouth", "GagLight"],
						},
					},
					{
						Name: "OTM",
						Property: {
							Type: "OTM",
							Effect: ["BlockMouth", "GagEasy"],
						},
					},
					{
						Name: "OTN",
						Property: {
							Type: "OTN",
							Effect: ["BlockMouth", "GagEasy"],
						},
					},
				],
				Dialog: {
					Load: "SelectGagType",
					TypePrefix: "ClothGagType",
					ChatPrefix: "ClothGagSet",
				},
			},
		}, // ClothGag
		WiffleGag: {
			Archetype: ExtendedArchetype.TYPED,
			Config: {
				Options: [
					{
						Name: "Normal",
						Property: {
							Type: null,
							Effect: ["BlockMouth", "GagNormal"],
						},
					},
					{
						Name: "Tight",
						Property: {
							Type: "Tight",
							Effect: ["BlockMouth", "GagNormal"],
						},
					},
				],
				Dialog: {
					Load: "SelectGagType",
					TypePrefix: "BallGagMouthType",
					ChatPrefix: "BallGagMouthSet",
				},
			},
		}, // WiffleGag
		BallGag: {
			Archetype: ExtendedArchetype.TYPED,
			Config: {
				Options: [
					{
						Name: "Normal",
						Property: {
							Type: null,
							Effect: ["BlockMouth", "GagMedium"],
						},
					},
					{
						Name: "Shiny",
						Property: {
							Type: "Shiny",
							Effect: ["BlockMouth", "GagMedium"],
						},
					},
					{
						Name: "Tight",
						Property: {
							Type: "Tight",
							Effect: ["BlockMouth", "GagMedium"],
						},
					},
				],
				Dialog: {
					Load: "SelectGagType",
					TypePrefix: "BallGagMouthType",
					ChatPrefix: "BallGagMouthSet",
				},
			},
		}, // BallGag
		HarnessBallGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { AssetName: "BallGag" },
		},
		DuctTape: {
			Archetype: ExtendedArchetype.TYPED,
			Config: {
				Options: [
					{
						Name: "Small",
						Property: {
							Type: null,
							Effect: ["BlockMouth", "GagVeryLight"],
						},
					},
					{
						Name: "Crossed",
						Property: {
							Type: "Crossed",
							Effect: ["BlockMouth", "GagLight"],
						},
					},
					{
						Name: "Full",
						Property: {
							Type: "Full",
							Effect: ["BlockMouth", "GagEasy"],
						},
					},
					{
						Name: "Double",
						Property: {
							Type: "Double",
							Effect: ["BlockMouth", "GagNormal"],
						},
					},
					{
						Name: "Cover",
						Property: {
							Type: "Cover",
							Effect: ["BlockMouth", "GagMedium"],
						},
					},
				],
				Dialog: {
					Load: "SelectGagType",
					TypePrefix: "DuctTapeMouthType",
					ChatPrefix: "DuctTapeMouthSet",
				},
			},
		}, // DuctTape
		CupholderGag: {
			Archetype: ExtendedArchetype.TYPED,
			Config: {
				Options: [
					{
						Name: "NoCup",
						Property: {
							Type: null,
							Effect: ["BlockMouth", "GagEasy"],
						},
					},
					{
						Name: "Tip",
						Property: {
							Type: null,
							Effect: ["BlockMouth", "GagEasy"],
						},
					},
					{
						Name: "Cup",
						Property: {
							Type: "Cup",
							Effect: ["BlockMouth", "GagEasy"],
						},
					},
				],
				Dialog: {
					Load: "CupholderGagOptions",
					TypePrefix: "CupholderGagOptions",
					ChatPrefix: "CupholderGagSet",
				},
				DrawImages: false,
			},
		}, // CupholderGag
		PumpGag: {
			Archetype: ExtendedArchetype.TYPED,
			Config: {
				Options: [
					{
						Name: "Empty",
						Property: {
							Type: null,
							InflateLevel: 0,
							Difficulty: 0,
							Effect: ["BlockMouth"],
						},
					},
					{
						Name: "Light",
						Property: {
							Type: "Light",
							InflateLevel: 1,
							Difficulty: 2,
							Effect: ["BlockMouth", "GagLight"],
						},
					},
					{
						Name: "Inflated",
						Property: {
							Type: "Inflated",
							InflateLevel: 2,
							Difficulty: 4,
							Effect: ["BlockMouth", "GagEasy"],
						},
					},
					{
						Name: "Bloated",
						Property: {
							Type: "Bloated",
							InflateLevel: 3,
							Difficulty: 6,
							Effect: ["BlockMouth", "GagMedium"],
						},
					},
					{
						Name: "Maximum",
						Property: {
							Type: "Maximum",
							InflateLevel: 4,
							Difficulty: 8,
							Effect: ["BlockMouth", "GagVeryHeavy"],
						},
					},
				],
				Dialog: {
					Load: "SelectInflateLevel",
					TypePrefix: "InflateLevel",
					ChatPrefix: ({ previousIndex, newIndex }) =>
						`PumpGag${newIndex > previousIndex ? "pumps" : "deflates"}To`,
				},
				DrawImages: false,
			},
		}, // PumpGag
		PlugGag: {
			Archetype: ExtendedArchetype.TYPED,
			Config: {
				Options: [
					{
						Name: "Open",
						Property: {
							Type: null,
							Effect: ["GagMedium", "OpenMouth"],
						},
					},
					{
						Name: "Plug",
						Property: {
							Type: "Plug",
							Effect: ["BlockMouth", "GagTotal"],
						},
					},
				],
				Dialog: {
					Load: "SelectGagType",
					TypePrefix: "PlugGagMouthType",
					ChatPrefix: "PlugGagMouthSet",
				},
			},
		}, // PlugGag
		DildoPlugGag: {
			Archetype: ExtendedArchetype.TYPED,
			Config: {
				Options: [
					{
						Name: "Open",
						Property: {
							Type: null,
							Effect: ["GagEasy", "OpenMouth"],
						},
					},
					{
						Name: "Plug",
						Property: {
							Type: "Plug",
							Effect: ["BlockMouth", "GagTotal2"],
						},
					},
				],
				Dialog: {
					Load: "SelectGagType",
					TypePrefix: "PlugGagMouthType",
					ChatPrefix: "DildoPlugGagMouthSet",
				},
			},
		}, // DildoPlugGag
		MilkBottle: {
			Archetype: ExtendedArchetype.TYPED,
			Config: {
				Options: [
					{
						Name: "Rest",
						Property: { Type: null },
					},
					{
						Name: "Raised",
						Property: { Type: "Raised" },
					},
					{
						Name: "Chug",
						Property: { Type: "Chug" },
					},
				],
				Dialog: {
					Load: "SelectMilkBottleState",
					TypePrefix: "MilkBottle",
					ChatPrefix: "MilkBottleSet",
				},
			},
		}, // MilkBottle
		FunnelGag: {
			Archetype: ExtendedArchetype.TYPED,
			Config: {
				Options: [
					{
						Name: "None",
						Property: {
							Type: null,
							Effect: ["GagMedium", "OpenMouth"],
						},
					},
					{
						Name: "Funnel",
						Property: {
							Type: "Funnel",
							Effect: ["BlockMouth", "GagMedium"],
						},
					},
				],
				Dialog: {
					Load: "SelectGagType",
					TypePrefix: "FunnelGagMouthType",
					ChatPrefix: "FunnelGagMouthSet",
				},
			},
		}, // FunnelGag
		HarnessPonyBits: {
			Archetype: ExtendedArchetype.TYPED,
			Config: {
				Options: [
					{
						Name: "Detached",
						Property: {
							Type: "Detached",
							Effect: ["OpenMouth"]
						},
					},
					{
						Name: "Attached",
						Property: {
							Type: null,
							Effect: ["BlockMouth", "GagLight"]
						},
					},
				],
			},
		}, // PonyBit
		DentalGag: {
			Archetype: ExtendedArchetype.TYPED,
			Config: {
				ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR],
				Options: [
					{
						Name: "Open",
						Property: {
							Type: null,
							Effect: ["OpenMouth", "GagLight"],
						},
					},
					{
						Name: "Closed",
						Property: {
							Type: "Closed",
							Effect: ["BlockMouth", "GagMedium"],
						},
					},
				]
			},
		}, // DentalGag
		Ribbons: {
			Archetype: ExtendedArchetype.TYPED,
			Config: {
				Options: [
					{
						Name: "Basic",
						Property: {
							Type: null,
							Effect: ["BlockMouth", "GagVeryLight"],
						},
					},
					{
						Name: "Bow",
						Property: {
							Type: "Bow",
							Effect: ["BlockMouth", "GagLight"],
						},
					},
				],
				Dialog: {
					Load: "SelectRibbonType",
					TypePrefix: "RibbonType",
					ChatPrefix: "RibbonsGagSet",
				},
			},
		}, // Ribbons
	}, // ItemMouth
	ItemMouth2: {
		ClothGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "ClothGag" },
		},
		WiffleGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "WiffleGag" },
		},
		BallGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "BallGag" },
		},
		HarnessBallGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "BallGag" },
		},
		DuctTape: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "DuctTape" },
		},
		CupholderGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "CupholderGag" },
		},
		Ribbons: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "Ribbons" },
		},
	}, // ItemMouth2
	ItemMouth3: {
		ClothGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "ClothGag" },
		},
		WiffleGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "WiffleGag" },
		},
		BallGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "BallGag" },
		},
		HarnessBallGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "BallGag" },
		},
		DuctTape: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "DuctTape" },
		},
		CupholderGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "CupholderGag" },
		},
		Ribbons: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "Ribbons" },
		},
	}, // ItemMouth3
	Mask: {
		BunnyMask1: {
			Archetype: ExtendedArchetype.TYPED,
			Config: {
				Options: [
					{
						Name: "Ears",
						Property: { Type: null },
					},
					{
						Name: "Earless",
						Property: { Type: "Earless", OverridePriority: 51 },
					},
				],
				Dialog: {
					Load: "SelectBunnyMaskStyle",
					TypePrefix: "BunnyMaskType",
				},
			}
		} // BunnyMask1
	}, // Mask
	ItemLegs: {
		SturdyLeatherBelts: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemArms", AssetName: "SturdyLeatherBelts" },
			Config: {
				Options: [
					{
						Name: "One",
						Property: { Type: null, },
					},
					{
						Name: "Two",
						Property: { Type: "Two", Difficulty: 2, },
					},
				],
			}
		}, // SturdyLeatherBelts
	}, // ItemLegs
	ItemFeet: {
		SteelAnkleCuffs: {
			Archetype: ExtendedArchetype.TYPED,
			Config: {
				Options: [
					{
						Name: "None",
						Property: {	Type: null }
					},
					{
						Name: "Closed",
						Property: {
							Type: "Closed",
							Effect: ["Prone", "Freeze"],
							SetPose: ["LegsClosed"],
							FreezeActivePose: ["BodyLower"]
						}
					}
				],
				Dialog: {
					Load: "SelectBondagePosition"
				}
			}
		}, // SteelAnkleCuffs
		SturdyLeatherBelts: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemArms", AssetName: "SturdyLeatherBelts" },
		}, // SturdyLeatherBelts 
	}, // ItemFeet
	ItemMisc: {
		ServingTray: {
			Archetype: ExtendedArchetype.TYPED,
			Config: {
				Options: [
					{ Name: "Empty", Property: { Type: null } },
					{ Name: "Full", Property: { Type: "Full" } },
				],
			},
		}, // WoodenMaidTray
	}, // ItemMisc
	ItemPelvis: {
		SilkStraps: {
			Archetype: ExtendedArchetype.TYPED,
			Config: {
				Options: [
					{ Name: "Crotch",
				Property: { Type: null }
					},

					{ Name: "OverPanties",
				Property: { Type: "OverPanties", OverridePriority: 21 }
			},
			{ Name: "SwissSeat",
			Property: { Type: "SwissSeat" }
				},

				{ Name: "KikkouHip",
			Property: { Type: "KikkouHip" }
				},

				]				
			},
		}, // SilkStraps
	}, // ItemPelvis
	Bra: {
		SilkStraps: {
			Archetype: ExtendedArchetype.TYPED,
			Config: {
				Options: [
					{ Name: "Strip", Property: { Type: null } },
					{ Name: "Wrap", Property: { Type: "Wrap" } },
					{ Name: "Bra1", Property: { Type: "Bra1" } },
					{ Name: "Bra2", Property: { Type: "Bra2" } },
					{ Name: "Swimsuit", Property: { Type: "Swimsuit" } },
				]
			}
		}, // SilkStraps
	}, // Bra
	Panties: {
		SilkStraps: {
			Archetype: ExtendedArchetype.TYPED,
			Config: {
				Options: [
					{ Name: "Strips", Property: { Type: null } },
					{ Name: "Wrap", Property: { Type: "Wrap" } },
					{ Name: "Thong", Property: { Type: "Thong" } },
					{ Name: "Panties1", Property: { Type: "Panties1" } },
				]				
			},
		}, // SilkStraps
	}, // Panties
};


/**
 *
 * An object containing the extended item definition for an asset.
 * @typedef ExtendedItemAssetConfig
 * @type {object}
 * @property {ExtendedArchetype} Archetype - The extended item archetype that this asset uses.
 * @property {ModularItemConfig|TypedItemConfig} Config - The specific configuration for the item (type will vary based
 * on the item's archetype)
 * @property {{GroupName?: string, AssetName: string}} [CopyConfig] - The group name and asset name of a configuration
 *     to copy - useful if multiple items share the same config
 *
 * An object containing extended item definitions for a group. Maps asset names within the group to their extended item
 * configuration
 * @typedef ExtendedItemGroupConfig
 * @type {Object.<string, ExtendedItemAssetConfig>}
 * @see {@link ExtendedItemAssetConfig}
 *
 * An object containing extended item configurations keyed by group name.
 * @typedef ExtendedItemConfig
 * @type {Object.<string, ExtendedItemGroupConfig>}
 * @see {@link ExtendedItemAssetConfig}
 */
