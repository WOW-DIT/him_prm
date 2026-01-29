// Copyright (c) 2023, Mosaab and contributors
// For license information, please see license.txt

const style = `
	body {
		background: #0b1421;
		font-family: "Inter", sans-serif;
	}

	/* === Layout: Grid with max 5 per row === */
	.pump-dashboard {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 14px;
		padding: 20px;
		max-width: 1600px; /* optional: control total width */
		margin: 0 auto; /* center the grid */
	}

	#racks {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	.rack-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.rack-header-segment {
		display: flex;
		gap: 10px;
	}

	.pump-card {
		/*display: flex;*/
		margin: 0px;
		justify-content: space-between;
		align-items: center;
		padding: 14px 22px;
		border-radius: 10px;
		background: linear-gradient(90deg, #12243b, #0d1c30);
		color: #e6eaf2;
		box-shadow: 0 3px 12px rgba(0, 0, 0, 0.45);
		border-left: 6px solid transparent;
		transition: all 0.3s ease;
		min-height: 110px;
	}

	.pump_body {
		display: flex;
		align-items: center;
	}

	.pump_details {
		display: flex;
		flex-direction: column;
		width: 100%
		justify-content: center;
		align-items: center;
	}

	.alarms_list {
		display: flex;
		flex-direction: column;
		gap: 10px;
		height: 100%;
		justify-content: start;
		align-items: start;
	}

	.left-section {
		width: 28%;
	}
	.center-section {
		width: 48%;
		font-size: 0.9em;
		color: #d7dde8;
	}
	.right-section {
		width: 20%;
		text-align: right;
		font-size: 0.8em;
	}

	.pump-id {
		font-weight: 600;
		font-size: 1em;
		color: #fff;
	}
	.pump-status {
		opacity: 0.9;
		font-size: 0.9em;
	}
	.last-update {
		color: #9fb4d8;
	}

	.indicator {
		width: 14px;
		height: 14px;
		border-radius: 50%;
		margin-top: 6px;
	}
 	.rack {
        border-radius: 20px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        background-color: #ffffff;
        padding: 20px;
    }
    .side-column {
        border-radius: 15px;
        background-color: #e9ecef;
        padding: 5px;
        height: 100%;
    }
    .top-right {
        border-radius: 15px;
        background-color: #dee2e6;
        padding: 15px;
        margin-bottom: 15px;
        text-align: center;
    }
	.top-right h6 {
		margin: 0px !important;
	}
    .bottom-right {
        border-radius: 15px;
        background-color: #dee2e6;
        padding: 20px;
        text-align: center;
        height: 150px; 
    }


	/* === Operation Status Colors === */
	.pump-card.stop { border-left-color: #3a7bd5; }
	.pump-card.start { border-left-color: #27ae60; }
	.pump-card.purge { border-left-color: #f1c40f; }
	.pump-card.bolus { border-left-color: #e67e22; }
	.pump-card.poweroff { border-left-color: #7f8c8d; }
	.pump-card.error { border-left-color: #e74c3c; }

	.indicator.stop { background: #3a7bd5; }
	.indicator.start { background: #27ae60; animation: pulse-green 1.5s infinite; }
	.indicator.purge { background: #f1c40f; animation: pulse-yellow 2s infinite; }
	.indicator.bolus { background: #e67e22; animation: pulse-orange 1s infinite; }
	.indicator.poweroff { background: #7f8c8d; opacity: 0.5; }
	.indicator.error { background: #e74c3c; animation: blink-red 1s infinite; }

	/* === Animations === */
	@keyframes pulse-green {
		0% { box-shadow: 0 0 0 0 rgba(39,174,96, 0.7); }
		70% { box-shadow: 0 0 0 8px rgba(39,174,96, 0); }
		100% { box-shadow: 0 0 0 0 rgba(39,174,96, 0); }
	}
	@keyframes pulse-yellow {
		0% { box-shadow: 0 0 0 0 rgba(241,196,15, 0.7); }
		70% { box-shadow: 0 0 0 8px rgba(241,196,15, 0); }
		100% { box-shadow: 0 0 0 0 rgba(241,196,15, 0); }
	}
	@keyframes pulse-orange {
		0% { box-shadow: 0 0 0 0 rgba(230,126,34, 0.7); }
		70% { box-shadow: 0 0 0 10px rgba(230,126,34, 0); }
		100% { box-shadow: 0 0 0 0 rgba(230,126,34, 0); }
	}
	@keyframes blink-red {
		50% { opacity: 0.3; }
	}

	.pump-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6);
	}

	/* Responsive Layout */
	@media (max-width: 1200px) {
		.pump-dashboard {
			grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		}
	}
	@media (max-width: 900px) {
		.pump-dashboard {
			grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
		}
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
			// console.log(pump_devices);
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

	const {rack_id} = rack_data;

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

	
				<div class="views row row-cols-2">
	
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
	const flow_rate = pump_data.set_flow_rate || "--";
	const increment_rate= pump_data.increment_in_value_delivered || "--";
	const vtbi = pump_data.vtbi || "--";
	const alarm = pump_data.alarm_status || "None";
	const alarm_description = pump_data.alarm_description || "";
	const updated_time = pump_data.updated_time || "--";

	current_pump.innerHTML = `
		<div class="row" style="background: dimgrey;padding: 5px;border-radius: 8px;">
			<div class="col-3" class="device_name">${device_name}</div>
				<div class="col-3">
				${ 
					ip_address?
						`<div class="ip-address">${ip_address}</div>`:
						``
				}
				</div>
				<div class="col-3 channel"></div>
				<div class="col-3 op_status">${getStatusLabel(op_status)}</div>
			</div>
			<div class="indicator2" style="display: ${(alarm === "NO" || alarm === "No alarm")? "block" : "none"};">
				<div class="row" style="height: 110px; margin: 30px;">
					<div class="col text-center h-100">
						<span class="increment-rate" style="color: white; font-size:xxx-large; align-items: center; align-content: center; text-align: center; margin: 30px;">
						${flow_rate}
						</span> mL/h
					</div>
				</div>
			</div>
			<div class="alarm" style="display: ${(alarm === "NO" || alarm === "No alarm")? "none" : "block"}; height:150px; text-align:center; background:red; color:white; font-size:clamp(16px, 5vw, 40pt); padding-top:24px;">
				${alarm_description??""}
			</div>
			<div class="row row-cols-2" style="">
				<div class="col">Flow Rate:</b> <span class="flow-rate">${flow_rate}</span> mL/h</div>
				<div class="col">Increment Rate:</b> <span class="increment-rate">${increment_rate}</span> mL</div>
				<div class="col">VTBI:</b> <span class="vtbi">${vtbi}</span></div>
				<div class="col">Mode:</b> <span class="mode">${capitalize(op_status)}</span></div>
			</div>
		</div>
	`;
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
	pump.className = `pump-card col ${operation_status}`;
	pump.setAttribute("data-pump-id", device_id);

	parent_element.appendChild(pump);
	return pump;
}

function set_standalone_pump(current_pump, pump_data) {
	const device_id = pump_data.device_id || device.name;
	const device_name = pump_data.device_name;
	const ip_address = pump_data.ip_address;
	const op_status = (pump_data.operation_status || "stop").toLowerCase();
	const flow_rate = pump_data.set_flow_rate || "--";
	const increment_rate= pump_data.increment_in_value_delivered || "--";
	const vtbi = pump_data.vtbi || "--";
	const alarm = pump_data.alarm_status || "None";
	const alarm_description = pump_data.alarm_description || "";
	const active_alarms = pump_data.active_alarms;

	const updated_time = pump_data.updated_time || "--";
	
	current_pump.innerHTML = `
		<div class="row" style="background: dimgrey;padding: 5px;border-radius: 8px;">
			<div class="col-3" class="device_name">${device_name}</div>
				<div class="col-3">
				${ 
					ip_address?
						`<div class="ip-address">${ip_address}</div>`:
						``
				}
				</div>
				${renderPowerType(pump_data.power_type)}
				<div class="col-3 battery_level">Battery Level: ${pump_data.battery_level}</div>
				<div class="col-2 op_status">${getStatusLabel(op_status)}</div>
			</div>
			<div class="pump_body">
				<div class="alarms_list">
					<strong>Alarms</strong>
				</div>
				<div class="pump_details">
					<div class="indicator2">
						<div class="row" style="height: 110px; margin: 30px;">
							<div class="col text-center h-100">
								<span class="increment-rate" style="color: white; font-size:xxx-large; align-items: center; align-content: center; text-align: center; margin: 30px;">
								${flow_rate}
								</span> mL/h
							</div>
						</div>
					</div>
					<div class="row row-cols-2" style="">
						<div class="col">Flow Rate:</b> <span class="flow-rate">${flow_rate}</span> mL/h</div>
						<div class="col">Increment Rate:</b> <span class="increment-rate">${increment_rate}</span> mL</div>
						<div class="col">VTBI:</b> <span class="vtbi">${vtbi}</span></div>
						<div class="col">Mode:</b> <span class="mode">${capitalize(op_status)}</span></div>
					</div>
				</div>	
			</div>
		</div>
	`;

	const alarmsList = current_pump.querySelector(".alarms_list");
	for (let i = 0; i < active_alarms.length; i++) {
		const active_alarm = active_alarms[i];
		alarmsList.innerHTML += `<div>${active_alarm}</div>`;
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
	const racks_container = document.getElementById("racks");
		
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
	        const device_id = device.device_id || device.name;

			if (is_rack) {
				remove_standalone_pump(device_id);

				const rack_status = device.rack_status;
				const current_rack = get_rack_element({
					rack_id: rack_id,
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
		

			// const flowDoc = card.querySelector(".flow-rate");
			// const incrementDoc = card.querySelector(".increment-rate");
			// const vtbiDoc = card.querySelector(".vtbi");
			// const modeDoc = card.querySelector(".mode");
			// const alarmDoc = card.querySelector(".alarm");
			// const updateDoc = card.querySelector(".updated-time");
			// const channel1 = card.querySelector(".channel");
			// const statusLabel = card.querySelector(".op_status");
			// const indicator = card.querySelector(".indicator2");

	       	// flowDoc.innerHTML = flow_rate;
			// incrementDoc.innerHTML = flow_rate;
			// vtbiDoc.innerHTML = vtbi || "--";
			// alarmDoc.innerHTML = alarm;
			// modeDoc.innerHTML = capitalize(op_status);
			// //updateDoc.innerHTML = data.timestamp || "--";
			// statusLabel.innerHTML = getStatusLabel(op_status);
			// channel1.innerHTML=channel;
			// if(alarm === "NO" || alarm === "No alarm")
			// {
			// 	alarmDoc.style.display = "none";
			// 	indicator.style.display = "block";
			// 	card.style.background="linear-gradient(90deg, #12243b, #0d1c30)";
			// }else{
			// 	indicator.style.display = "none";
			// 	alarmDoc.style.display = "block";
			// 	card.style.background="red";
			// }
		    // // Reset classes
            // card.className = `pump-card col ${op_status}`;
            // //indicator.className = `indicator ${op_status}`;

			// // if (op_status === "start") {
			// // 	setTimeout(() => {
			// // 		card.className = "pump-card stop";
			// // 		indicator.className = "indicator stop";
			// // 		statusLabel.innerHTML = getStatusLabel("stop");
			// // 		modeDoc.innerHTML = "Stop";
			// // 	}, 5000);
			// // }
        });

        // Attach events after last device rendered
        // if (i === devices.length - 1) attachEvents();
    }
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
	if (String(power_type) === "0") {
		return `
			<div class="power_type">
				<img src="/files/unplugged.svg" width="25">
			</div>
		`
	} else {
		return `
			<div class="power_type">
				<img src="/files/plugged.svg" width="25">
			</div>
		`
	}
}

/* Helper: readable label with emoji */
function getStatusLabel(status) {
    switch (status) {
        case "0": return "<span style='background:blue;Padding:2px;'>Stopped</span>";
        case "1": return "<span style='background:green;Padding:2px;'>Delivering</span>";
        case "4": return "<span style='background:orange;Padding:2px;'>Purging</span>";
        case "5": return "<span style='background:orangered;Padding:2px;'>Bolus</span>";
        case "6": return "<span style='background:black;color:white;Padding:2px;'>Power Off</span>";
        case "7": return "<span style='background:red;Padding:2px;'>Error</span>";
        default: return "<span style='background:white;Padding:2px;'>Unknown</span>";
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
