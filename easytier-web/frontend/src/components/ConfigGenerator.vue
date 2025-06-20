<script setup lang="ts">
import { NetworkTypes } from 'easytier-frontend-lib';
import {computed, ref} from 'vue';
import { Api } from 'easytier-frontend-lib'
import {AutoComplete, Divider, Button, Textarea} from "primevue";
import {getInitialApiHost, cleanAndLoadApiHosts, saveApiHost} from "../modules/api-host"

const api = computed<Api.ApiClient>(() => new Api.ApiClient(apiHost.value));

const apiHost = ref<string>(getInitialApiHost())
const apiHostSuggestions = ref<Array<string>>([])
const apiHostSearch = async (event: { query: string }) => {
  apiHostSuggestions.value = [];
  let hosts = cleanAndLoadApiHosts();
  if (event.query) {
    apiHostSuggestions.value.push(event.query);
  }
  hosts.forEach((host) => {
    apiHostSuggestions.value.push(host.value);
  });
}

const newNetworkConfig = ref<NetworkTypes.NetworkConfig>(NetworkTypes.DEFAULT_NETWORK_CONFIG());
const toml_config = ref<string>("");
const errorMessage = ref<string>("");

const generateConfig = (config: NetworkTypes.NetworkConfig) => {
  saveApiHost(apiHost.value)
  errorMessage.value = "";
  api.value?.generate_config({
        config: config
    }).then((res) => {
        if (res.error) {
            errorMessage.value = "生成失败: " + res.error;
        } else if (res.toml_config) {
            toml_config.value = res.toml_config;
        } else {
            errorMessage.value = "Api 服务器返回了意外的响应";
        }
    }).catch(err => {
        errorMessage.value = "生成请求失败: " + (err instanceof Error ? err.message : String(err));
    });
};

const parseConfig = async () => {
  try {
    errorMessage.value = "";
    const res = await api.value?.parse_config({
      toml_config: toml_config.value
    });
    
    if (res.error) {
      errorMessage.value = "解析失败: " + res.error;
    } else if (res.config) {
      newNetworkConfig.value = res.config;
    } else {
      errorMessage.value = "API 返回了意外的响应";
    }
  } catch (e) {
    errorMessage.value = "解析请求失败: " + (e instanceof Error ? e.message : String(e));
  }
};

</script>

<template>
    <div class="flex items-center justify-center m-5">
        <div class="sm:block md:flex w-full">
            <div class="sm:w-full md:w-1/2 p-4">
                <div class="flex flex-col">
                  <div class="w-11/12 self-center ">
                    <label>ApiHost</label>
                    <AutoComplete id="api-host" v-model="apiHost" dropdown :suggestions="apiHostSuggestions"
                                  @complete="apiHostSearch" class="w-full" />
                    <Divider />
                  </div>
                </div>
                <Config :cur-network="newNetworkConfig" @run-network="generateConfig" />
            </div>
            <div class="sm:w-full md:w-1/2 p-4 flex flex-col h-[calc(100vh-80px)]">
                <pre v-if="errorMessage" class="mb-2 p-2 rounded text-sm overflow-auto bg-red-100 text-red-700 max-h-40">{{ errorMessage }}</pre>
                <Textarea 
                    v-model="toml_config" 
                    spellcheck="false"
                    class="w-full flex-grow p-2 bg-gray-100 whitespace-pre-wrap font-mono border-none focus:outline-none resize-none" 
                    placeholder="点击 '运行网络' 生成 TOML 配置，或在此处粘贴您的 TOML 配置以进行解析"
                ></Textarea>
                <div class="mt-3 flex justify-center">
                  <Button label="Parse Config" icon="pi pi-arrow-left" icon-pos="left" @click="parseConfig" />
                </div>
            </div>
        </div>
    </div>
</template>
