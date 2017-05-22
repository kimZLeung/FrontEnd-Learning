<template lang="html">
	<div>
		<button v-bind:class="button_class_obj" @click="button_click">
			<i v-if="this.style_obj.loading && this.style_obj.loading == true" class="weui-loading"></i>
			{{style_obj.title}}
		</button>
	</div>
</template>

<script>
export default {
	props: ["style_obj"],
	data () {
		return {
			// style_obj: {
			// 	type: this.style_objs.type || "default",
			// 	plain: this.style_objs.plain || false,
			// 	disabled: this.style_objs.disabled || false,
			// 	mini: this.style_objs.mini || false,
			// 	loading: this.style_objs.loading || false,
			// 	title: this.style_objs.title || "click",
			// 	click_method: this.style_objs.click_method
			// }
		}
	},
	computed: {
		button_class_obj: function () {
			if(!this.style_obj.type) this.style_obj.type = "default";
			var obj = {
				"weui-btn": true
			}
			if(this.style_obj.plain && this.style_obj.plain == true) {
				obj = Object.assign(obj, {
					"weui-btn_plain-primary": this.style_obj.type === "primary",
					"weui-btn_plain-default": this.style_obj.type === "default",
					"weui-btn_plain-disabled": this.style_obj.disabled && this.style_obj.disabled == true,
				})
			} else {
				obj = Object.assign(obj, {
					"weui-btn_primary": this.style_obj.type === "primary",
					"weui-btn_default": this.style_obj.type === "default",
					"weui-btn_warn": this.style_obj.type === "warn",
					"weui-btn_disabled": this.style_obj.disabled && this.style_obj.disabled == true,
					"weui-btn_loading": this.style_obj.loading && this.style_obj.loading == true
				})
			}
			if(this.style_obj.mini && this.style_obj.mini == true) {
				obj = Object.assign(obj, {
					"weui-btn_mini": true
				})
			}
			return obj
		}
	},
	methods: {
		button_click: function() {
			// this.toggleLoading();
			// this.style_obj.click_method ? this.style_obj.click_method() : ""
			this.$emit('click')
		},
		// toggleLoading: function() {
		// 	this.style_obj.loading = !this.style_obj.loading;
		// }
	}
}
</script>

<style lang="css" scoped>
	button {
		cursor: pointer;
		margin-top: 2rem;
	}
</style>
