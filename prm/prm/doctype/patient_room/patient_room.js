// Copyright (c) 2023, Mosaab and contributors
// For license information, please see license.txt

const style = `
	/* =========================================================
   Frappe-based Pump Monitoring UI – Full Style
   Dark / Light aware – No hardcoded colors
   ========================================================= */

/* -------------------------
   Root / Theme Variables
   ------------------------- */
:root {
	--pump-card-bg: var(--card-bg-color, var(--bg-color));
	--pump-card-bg-alt: var(--bg-light);
	--pump-border: var(--border-color);
	--pump-text: var(--text-color);
	--pump-muted: var(--text-muted);

	--pump-primary: var(--primary-color);
	--pump-danger: var(--alert-danger);
	--pump-danger-bg: var(--alert-danger-bg);
	--pump-warning: var(--alert-warning);
	--pump-success: var(--alert-success);

	--shadow-sm: 0 2px 6px rgba(0, 0, 0, 0.15);
	--shadow-md: 0 6px 18px rgba(0, 0, 0, 0.25);
	--shadow-lg: 0 12px 28px rgba(0, 0, 0, 0.35);
	--shadow-alarm: 0 0 0 2px rgba(231, 76, 60, 0.35),
	                0 12px 28px rgba(231, 76, 60, 0.45);
}

/* -------------------------
   Layout Containers
   ------------------------- */
#racks {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.views {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 16px;
	margin-top: 16px;
}

#standalone-pumps {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 16px;
	margin-top: 16px;
}

@media (max-width: 1200px) {
	#standalone-pumps {
		grid-template-columns: repeat(2, 1fr);
	}
}

@media (max-width: 768px) {
	#standalone-pumps {
		grid-template-columns: 1fr;
	}
}

/* -------------------------
   Pump Card (Base)
   ------------------------- */
.pump-card {
	border-radius: 16px;
	transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.pump-card-inner {
	height: 100%;
	background: var(--pump-card-bg);
	border: 1px solid var(--pump-border);
	border-radius: 16px;
	padding: 14px;
	box-shadow: var(--shadow-sm);
	color: var(--pump-text);
	display: flex;
	flex-direction: column;
}

/* Hover */
.pump-card:hover .pump-card-inner {
	transform: translateY(-2px);
	box-shadow: var(--shadow-md);
}

/* Alarm state */
.pump-card.has-alarm .pump-card-inner {
	border-color: var(--pump-danger);
	box-shadow: var(--shadow-alarm);
}

/* -------------------------
   Pump Header
   ------------------------- */
.pump-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 12px;
	margin-bottom: 10px;
}

.device-info {
	display: flex;
	flex-direction: column;
}

.device-name {
	font-weight: 700;
	font-size: 0.95rem;
	color: var(--pump-text);
}

.ip-address {
	font-size: 0.75rem;
	color: var(--pump-muted);
}

/* -------------------------
   Device Meta
   ------------------------- */
.device-meta {
	display: flex;
	align-items: center;
	gap: 10px;
}
/* =========================
   Status Badge (Base)
   ========================= */
.status-badge {
	padding: 4px 10px;
	border-radius: 999px;
	font-size: 0.75rem;
	font-weight: 700;
	white-space: nowrap;
	color: #fff;
	box-shadow: 0 0 0 1px rgba(255,255,255,0.1);
	transition: background 0.2s ease, box-shadow 0.2s ease;
}

/* =========================
   Status Colors (Frappe-based)
   ========================= */

/* STOP */
.status-badge.0 {
	background: var(--gray-500, #6b7280);
}

/* RUNNING / DELIVERING */
.status-badge.1 {
	background: var(--alert-success);
	box-shadow: 0 0 0 2px rgba(40,167,69,0.35);
}

/* PURGE */
.status-badge.4 {
	background: var(--alert-warning);
	color: #000;
}

/* BOLUS */
.status-badge.5 {
	background: var(--orange-500, #f97316);
}

/* POWER OFF */
.status-badge.6 {
	background: var(--gray-700, #374151);
}

/* ERROR */
.status-badge.7 {
	background: var(--alert-danger);
	box-shadow: 0 0 0 2px rgba(231,76,60,0.45),
	            0 0 18px rgba(231,76,60,0.55);
}

/* UNKNOWN */
.status-badge.unknown {
	background: var(--gray-400, #9ca3af);
	color: #000;
}

/* -------------------------
   Pump Body
   ------------------------- */
.pump-body {
	display: flex;
	gap: 14px;
	flex: 1;
}

/* -------------------------
   Operation Panel
   ------------------------- */
.operation-panel {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
}

.flow-rate-big {
	font-size: 2.4rem;
	font-weight: 800;
	line-height: 1;
	color: var(--pump-text);
}

.flow-rate-big span {
	font-size: 0.85rem;
	font-weight: 600;
	color: var(--pump-muted);
}

.operation-metrics {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 8px;
	margin-top: 10px;
}

.metric {
	text-align: center;
}

.metric label {
	font-size: 0.7rem;
	color: var(--pump-muted);
	display: block;
	margin-bottom: 2px;
}

.metric span {
	font-size: 0.8rem;
	font-weight: 700;
	color: var(--pump-text);
}

/* -------------------------
   Alarms – Standalone (List)
   ------------------------- */
.alarms-panel {
	width: 30%;
	min-width: 170px;
	background: var(--pump-danger-bg);
	border-left: 4px solid var(--pump-danger);
	border-radius: 12px;
	padding: 10px;
	display: none;
}

.alarms-header {
	font-size: 0.75rem;
	font-weight: 800;
	text-transform: uppercase;
	letter-spacing: 0.4px;
	color: var(--pump-danger);
	margin-bottom: 8px;
}

.alarms-list {
	display: flex;
	flex-direction: column;
	gap: 6px;
}

.alarm-item {
	font-size: 0.75rem;
	line-height: 1.25;
	padding: 6px 8px;
	border-radius: 6px;
	background: rgba(231, 76, 60, 0.15);
	border-left: 3px solid var(--pump-danger);
	color: var(--pump-text);
}

/* -------------------------
   Rack – Single Alarm Block
   ------------------------- */
.rack-alarm-panel {
	width: 30%;
	min-width: 170px;
	background: var(--pump-danger-bg);
	border-left: 4px solid var(--pump-danger);
	border-radius: 12px;
	padding: 10px;
	display: none;
}

.rack-alarm-item {
	font-size: 0.85rem;
	font-weight: 700;
	color: var(--pump-text);
	line-height: 1.3;
}

/* -------------------------
   Rack Container
   ------------------------- */
.rack {
	background: var(--pump-card-bg-alt);
	border-radius: 20px;
	padding: 20px;
	box-shadow: var(--shadow-md);
}

.rack-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16px;
}

.rack-header-segment {
	display: flex;
	gap: 10px;
}

.top-right {
	background: var(--pump-card-bg);
	border-radius: 14px;
	padding: 12px;
	text-align: center;
	box-shadow: var(--shadow-sm);
}

.top-right h6 {
	margin: 0;
	font-weight: 700;
	color: var(--pump-text);
}

/* -------------------------
   Dark / Light Fine Tuning
   ------------------------- */
[data-theme="dark"] .pump-card-inner {
	background: var(--bg-color);
}

[data-theme="light"] .pump-card-inner {
	background: var(--pump-card-bg-alt);
}

`;


frappe.ui.form.on('Patient Room', {
	refresh: async function(frm) {
		if(!frm.doc.name.startsWith("new")) {
			monitor_pumps(frm);
		}
	}
});

function monitor_pumps(frm) {
	buildMainHtml(frm);
	get_pump_devices(frm);
}

async function get_pump_devices(frm) {
	frappe.call({
		method: `terumo_integration.api_v2.get_pump_devices?patient_room=${frm.doc.name}`,
		callback: function(res) {
			const pump_devices = res.message;
			console.log(pump_devices);
			initializeViews(pump_devices);
			startDevicesCheckerTimer();
		}
	})
}

function buildMainHtml(frm) {
	frm.fields_dict.pumps_monitor.wrapper.innerHTML = `
		<style>${style}</style>
		<div id="main-cont">
			<div id="racks">
				
			</div>
			<div class"row row-cols-2" id="standalone-pumps">
			
			</div>
		</div>
	`;
}

function get_rack_element(rack_data) {
	console.log(rack_data);
	const racks_wrapper = document.getElementById("racks");
	const racks = racks_wrapper.querySelectorAll(".rack");

	const {rack_id, rack_name} = rack_data;
	console.log(rack_name)

	for (let i = 0; i < racks.length; i++) {
		const rack = racks[i];
		if (rack_id === rack.getAttribute("data-rack-id")) {
			// Rack already visible
			return rack;
		}
	}

	// Create a new rack container
	return create_rack(rack_data);
}

function create_rack(rack_data) {
	const {rack_id, rack_name, operation_status, power_type, battery_status} = rack_data;

	debugger
	const racks_container = document.getElementById("racks");

	const rack = document.createElement("div");
	rack.className = "rack";
	rack.setAttribute("data-rack-id", rack_id);
	rack.innerHTML = `
		<div class="row">	
			<div class="col-md-12">
	
				<div class="rack-header">
					<div class="rack-header-segment">
						<div class="top-right"><h6>${rack_name}</h6></div>
						<div class="top-right"><h6>${operation_status}</h6></div>
					</div>
					<div class="rack-header-segment">
						<div class="top-right">${renderPowerType(power_type)}</div>
						<div class="top-right">${renderRackBatteryStatus(battery_status)}</div>
					</div>
				</div>

	
				<div class="views">
	
				</div>
			</div>
		</div>
	`;

	racks_container.appendChild(rack);
	return rack;
}


function get_rack_pump_element(current_rack, pump_data) {
	const pumps_wrapper = current_rack.querySelector(".views");
	const pumps = pumps_wrapper.querySelectorAll(".pump-card");
	
	const {device_id} = pump_data;

	for (let i = 0; i < pumps.length; i++) {
		const pump = pumps[i];
		if (device_id === pump.getAttribute("data-pump-id")){
			return pump;
		}
	}

	return create_pump(pumps_wrapper, pump_data);
}

function set_rack_pump(current_pump, pump_data) {
	const device_name = pump_data.device_name;
	const ip_address = pump_data.ip_address;
	const op_status = (pump_data.operation_status || "stop").toLowerCase();
	const flow_rate = pump_data.set_flow_rate || "0";
	const increment_rate = pump_data.increment_in_value_delivered || "0";
	const vtbi = pump_data.vtbi || "0";

	const alarm = pump_data.alarm_status || "NO";
	const alarm_description = pump_data.alarm_description || "";

	const RACK_PUMP_HTML = `
		<div class="pump-card-inner">

			<!-- Header -->
			<div class="pump-header">
				<div class="device-info">
					<div class="device-name">${device_name}</div>
					<div class="ip-address">${ip_address || ""}</div>
				</div>

				<div class="device-meta">
					<div class="status-badge ${op_status}">
						${getStatusLabel(op_status)}
					</div>
				</div>
			</div>

			<!-- Body -->
			<div class="pump-body">

				<!-- Single Alarm Block (ONLY if alarm exists) -->
				<div class="alarms-panel rack-alarm-panel" style="display:none">
					<div class="alarms-header">⚠ Alarm</div>
					<div class="alarm-item rack-alarm-item"></div>
				</div>

				<!-- Operation Panel -->
				<div class="operation-panel">
					<div class="flow-rate-big">
						${flow_rate} <span>mL/h</span>
					</div>

					<div class="operation-metrics">
						<div class="metric">
							<label>VTBI</label>
							<span>${vtbi}</span>
						</div>
						<div class="metric">
							<label>Increment</label>
							<span>${increment_rate}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	`;

	current_pump.innerHTML = RACK_PUMP_HTML;

	/* Alarm handling (single alarm only) */
	const alarmPanel = current_pump.querySelector(".rack-alarm-panel");
	const alarmItem  = current_pump.querySelector(".rack-alarm-item");

	if (alarm !== "NO" && alarm !== "No alarm" && alarm_description) {
		alarmPanel.style.display = "block";
		current_pump.classList.add("has-alarm");
		alarmItem.textContent = alarm_description;
	} else {
		alarmPanel.style.display = "none";
		current_pump.classList.remove("has-alarm");
	}
}

function get_standalone_pump_element(pump_data) {
	const pumps_wrapper = document.getElementById("standalone-pumps");
	const pumps = pumps_wrapper.querySelectorAll(".pump-card");

	const {device_id} = pump_data;

	for (let i = 0; i < pumps.length; i++) {
		const pump = pumps[i];
		if (device_id === pump.getAttribute("data-pump-id")) {
			// Pump already visible
			return pump;
		}
	}

	// Create new pump element
	return create_pump(pumps_wrapper, pump_data);
}

function create_pump(parent_element, pump_data) {
	const {device_id, operation_status} = pump_data;

	const pump = document.createElement("div");
	pump.className = `pump-card ${operation_status}`;
	pump.setAttribute("data-pump-id", device_id);

	parent_element.appendChild(pump);
	return pump;
}

function set_standalone_pump(current_pump, pump_data) {
	const device_id = pump_data.device_id || device.name;
	const device_name = pump_data.device_name;
	const ip_address = pump_data.ip_address;
	const op_status = (pump_data.operation_status || "stop").toLowerCase();
	const flow_rate = pump_data.set_flow_rate || "0";
	const increment_rate= pump_data.increment_in_value_delivered || "0";
	const vtbi = pump_data.vtbi || "0";
	const active_alarms = pump_data.active_alarms;

	const STANDALONE_PUMP_HTML = `
		<div class="pump-card-inner">

			<!-- Header -->
			<div class="pump-header">
				<div class="device-info">
					<div class="device-name">{{device_name}}</div>
					<div class="ip-address">{{ip_address}}</div>
				</div>

				<div class="device-meta">
					<div class="power-type">{{power_type}}</div>
					<div class="battery-level">🔋 {{battery_level}}</div>
					<div class="status-badge status-{{status_class}}">
					{{status_label}}
					</div>
				</div>
			</div>

			<!-- Body -->
			<div class="pump-body">

				<!-- Alarms Panel (hidden by default, JS controls visibility) -->
				<div class="alarms-panel" style="display:none">
					<div class="alarms-header">⚠ Active Alarms</div>
					<div class="alarms-list"></div>
				</div>

				<!-- Operation Panel -->
				<div class="operation-panel">
					<div class="flow-rate-big">
						{{flow_rate}} <span>mL/h</span>
					</div>

					<div class="operation-metrics">
						<div class="metric">
							<label>VTBI</label>
							<span>{{vtbi}}</span>
						</div>
						<div class="metric">
							<label>Increment</label>
							<span>{{increment_rate}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	`;
	current_pump.innerHTML = STANDALONE_PUMP_HTML
	.replace("{{device_name}}", device_name || "--")
	.replace("{{ip_address}}", ip_address || "")
	.replace("{{power_type}}", renderPowerType(pump_data.power_type))
	.replace("{{battery_level}}", pump_data.battery_level ?? "--")
	.replace("{{status_label}}", getStatusLabel(op_status))
	.replace("{{status_class}}", op_status)
	.replace("{{flow_rate}}", flow_rate)
	.replace("{{vtbi}}", vtbi)
	.replace("{{increment_rate}}", increment_rate)
	.replace("{{mode}}", capitalize(op_status));

	const alarmsPanel = current_pump.querySelector(".alarms-panel");
	const alarmsList  = current_pump.querySelector(".alarms-list");

	alarmsList.innerHTML = "";

	if (active_alarms && active_alarms.length > 0) {
		alarmsPanel.style.display = "block";
		current_pump.classList.add("has-alarm");

		active_alarms.forEach(alarm => {
			alarmsList.innerHTML += `
			<div class="alarm-item">${alarm}</div>
			`;
		});

	} else {
		alarmsPanel.style.display = "none";
		current_pump.classList.remove("has-alarm");
	}
}

function remove_rack_pump(device_id) {
	const racks_wrapper = document.getElementById("racks");
	const racks = racks_wrapper.querySelectorAll(".rack");

	for (let i = 0; i < racks.length; i++) {
		const rack = racks[i];
		const pumps = rack.querySelectorAll(".pump-card");
	
		for (let j = 0; j < pumps.length; j++) {
			const pump = pumps[j];
	
			if (device_id === pump.getAttribute("data-pump-id")) {
				pump.remove();
				break;
			}
		}

		if(rack.querySelectorAll(".pump-card").length === 0) {
			rack.remove();
		}
	}
}

function remove_standalone_pump(device_id) {
	const pumps_wrapper = document.getElementById("standalone-pumps");
	const pumps = pumps_wrapper.querySelectorAll(".pump-card");

	for (let i = 0; i < pumps.length; i++) {
		const pump = pumps[i];

		if (device_id === pump.getAttribute("data-pump-id")) {
			pump.remove();
			break;
		}
	}
}

function initializeViews(devices) {		
    for (let i = 0; i < devices.length; i++) {
		let device = devices[i];
		const is_rack = device.is_rack;
		const rack_id = device.rack;
		const rack_name = device.rack_name;
		const device_id = device.device_id || device.name;

		if (is_rack) {
			const rack_status = device.rack_status;
			const current_rack = get_rack_element({
				rack_id: rack_id,
				rack_name: rack_name,
				operation_status: rack_status.operation_status,
				power_type: rack_status.power_type,
				battery_status: rack_status.battery_status,
			});
			const current_pump = get_rack_pump_element(current_rack, device);

			set_rack_pump(current_pump, device);

		} else {
			const current_pump = get_standalone_pump_element(device);
			set_standalone_pump(current_pump, device);
		}

				
        // Listen for realtime updates
        frappe.realtime.on(`update_state_${device_id}`, function (data) {
			console.log(data);

            // const card = document.querySelector(`[data-pump-id="${data.device_id}"]`);
            // if (!card) return;
		 	let device = data;
			const is_rack = device.is_rack;
			const rack_id = device.rack_id;
			const rack_name = device.rack_name;
	        const device_id = device.device_id || device.name;

			if (is_rack) {
				remove_standalone_pump(device_id);

				const rack_status = device.rack_status;
				const current_rack = get_rack_element({
					rack_id: rack_id,
					rack_name: rack_name,
					operation_status: rack_status.operation_status,
					power_type: rack_status.power_type,
					battery_status: rack_status.battery_status,
				});
				const current_pump = get_rack_pump_element(current_rack, device);

				set_rack_pump(current_pump, device);

			} else {
				remove_rack_pump(device_id);

				const current_pump = get_standalone_pump_element(device);
				console.log(current_pump);
				set_standalone_pump(current_pump, device);
			}
        });

        // Attach events after last device rendered
        // if (i === devices.length - 1) attachEvents();
    }
}

function startDevicesCheckerTimer() {
	const timer = setInterval(() => {
		frappe.call({
			method: `terumo_integration.api_v2.check_devices_connectivity`,
			callback: function(res) {
				
			}
		})
	}, 5000)
}

function renderRackBatteryStatus(battery_status) {
	if (String(battery_status) === "0") {
		return `
			<div class="battery_status">
				<img src="/files/fully_charged.svg" width="25">
			</div>
		`
	} else if (String(battery_status) === "1") {
		return `
			<div class="battery_status">
				<img src="/files/charging.svg" width="25">
			</div>
		`
	} else {
		return `
			<div class="battery_status">
				<img src="/files/low_battery.svg" width="25">
			</div>
		`
	}
}

function renderPowerType(power_type) {
	if (String(power_type) === "1") {
		return `
			<div class="power_type">
				<img src="/files/plugged_green.svg" width="25">
			</div>
		`
	} else {
		return `
			<div class="power_type">
				<img src="/files/unplugged.svg" width="25">
			</div>
		`
	}
}

/* Helper: readable label with emoji */
function getStatusLabel(status) {
    switch (status) {
        case "0": return "<span style='background:blue;Padding:2px;'>Idle</span>";
        case "1": return "<span style='background:green;Padding:2px;'>Delivering</span>";
        case "4": return "<span style='background:orange;Padding:2px;'>Purging</span>";
        case "5": return "<span style='background:orangered;Padding:2px;'>Bolus</span>";
        case "6": return "<span style='background:black;color:white;Padding:2px;'>Power Off</span>";
        case "7": return "<span style='background:red;Padding:2px;'>Error</span>";
		case "500": return "<span style='background:black; color:red; Padding:2px;'>Disconnected</span>";
        default: return "<span style='background:white; color: black !important; Padding:2px;'>Unknown</span>";
    }
}

/* Helper: capitalize mode name */
function capitalize(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
}

/* Optional: link or click handler for pumps */
function attachEvents() {
    const cards = document.querySelectorAll(".pump-card");
    cards.forEach((card) => {
        const device_id = card.getAttribute("data-pump-id");
        frappe.call({
            method: "kvm.kvm_api.deviceURL",
            args: { device_id },
            callback: function (response) {
                const url = response.message;
                card.addEventListener("click", () => {
                    window.open(url, "_blank");
                });
            },
        });
    });
}
