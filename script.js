const compatibilityData = [
	{ label: 'Cleanliness', value: 92 },
	{ label: 'Budget', value: 87 },
	{ label: 'Sleep schedule', value: 74 },
	{ label: 'Study habits', value: 61 },
	{ label: 'Smoking preference', value: 45 },
	{ label: 'Pet tolerance', value: 38 },
];

const occupancyData = [
	{ label: 'Full', value: 58, color: '#3f5f6b' },
	{ label: 'Partially Filled', value: 34, color: '#778a52' },
	{ label: 'Vacant', value: 21, color: '#b08b57' },
];

const universityData = [
	{ label: 'DLSU', value: 45, color: '#3f5f6b' },
	{ label: 'Ateneo', value: 31, color: '#778a52' },
	{ label: 'UST', value: 27, color: '#b08b57' },
	{ label: 'UP', value: 22, color: '#6b7280' },
];

function renderBars(containerId, data) {
	const container = document.getElementById(containerId);
	const maxValue = Math.max(...data.map((item) => item.value));

	container.innerHTML = data
		.map((item) => {
			const width = (item.value / maxValue) * 100;
			return `
				<div class="bar-row">
					<div class="bar-label">${item.label}</div>
					<div class="bar-track" aria-hidden="true">
						<div class="bar-fill" style="width: ${width}%;"></div>
					</div>
					<div class="bar-value">${item.value}</div>
				</div>
			`;
		})
		.join('');
}

function renderLegend(containerId, data) {
	const container = document.getElementById(containerId);
	const total = data.reduce((sum, item) => sum + item.value, 0);

	container.innerHTML = data
		.map((item) => {
			const percent = ((item.value / total) * 100).toFixed(1);
			return `
				<div class="legend-item">
					<div class="legend-left">
						<span class="swatch" style="background: ${item.color};"></span>
						<span class="legend-name">${item.label}</span>
					</div>
					<span class="legend-value">${item.value} (${percent}%)</span>
				</div>
			`;
		})
		.join('');
}

function renderPieChart(containerId, legendId, data) {
	const container = document.getElementById(containerId);
	const legend = document.getElementById(legendId);
	const total = data.reduce((sum, item) => sum + item.value, 0);
	let startAngle = -90;
	const slices = data.map((item) => {
		const percent = (item.value / total) * 100;
		const endAngle = startAngle + (percent * 360) / 100;
		const segment = `${item.color} ${startAngle}deg ${endAngle}deg`;
		startAngle = endAngle;
		return segment;
	});

	container.style.background = `conic-gradient(${slices.join(', ')})`;
	container.setAttribute('role', 'img');
	container.setAttribute('aria-label', 'Pie chart for listings per university');

	legend.innerHTML = data
		.map((item) => `
			<div class="pie-series">
				<strong>${item.label}</strong>
				<span>Listings: ${item.value}</span>
				<span>Share: ${((item.value / total) * 100).toFixed(1)}%</span>
			</div>
		`)
		.join('');
}

document.addEventListener('DOMContentLoaded', () => {
	renderBars('compatibilityChart', compatibilityData);
	renderLegend('occupancyLegend', occupancyData);
	renderPieChart('universityPie', 'universityPieLegend', universityData);
});
