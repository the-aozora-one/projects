

export function runCommands() {
	// Declare your variables and runtime logic here! ✨
	let availableResource : 'food' | 'water' | undefined
	let day : number = 1
	let food : number = 5
	let water : number = 5

	// Run for 7 days or until food or water reach zero
	while (day <= 7) {
		rollForResupply()

		// Use one ration of food and water each day
		food -= 1
		water -= 1
		if (food === 0 || water === 0) {
			// Game Loss
			return false
		}
		day += 1
	}

	// Game Win
	return true

	/**
	 * Roll For Resupply
	 * Roll the dice and see what the day brings.
	 * 1 - Food becomes available for future resupplies
	 * 2 - Water becomes available for future resupplies
	 * 3-6 - If a resource is set, increase it by the roll
	 *       otherwise, set the available resource to food on an even roll
	 *       and to water on an odd roll
	 */
	function rollForResupply() {
		const minRoll : number = 1
		const maxRoll : number = 6
		const roll = Math.floor(Math.random() * (maxRoll - minRoll + 1)) + minRoll

		switch (roll) {
			case 1:
				availableResource = 'food'
				break
			case 2:
				availableResource = 'water'
				break
			default:
				if (availableResource === undefined) {
					availableResource = roll % 2 === 0
						? 'food'
						: 'water'
				} else {
					if (availableResource === 'food') {
						food += roll
					} else {
						water += roll
					}
					availableResource = undefined
				}
				break
		}
	}
}
