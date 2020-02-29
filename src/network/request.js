import axios from 'axios'

export function request(config) {
  axios.get('api/g2/getOnsInfo?name=disease_h5')
      .then(res => {
        let list = JSON.parse(res.data.data).areaTree[0].children;
        let number = list.findIndex(ele => ele.name === config.province);
        let data = list[number].children;
        let temp_confirm = 0;
        let temp_suspect = 0;
        let temp_dead = 0;
        let temp_heal = 0;
        let temp_children = [];
        let result = {};
        data.forEach(item => {
          const ele = item.total;
          temp_confirm = temp_confirm + ele.confirm;
          temp_suspect = temp_suspect + ele.suspect;
          temp_dead = temp_dead + ele.dead;
          temp_heal = temp_heal + ele.heal;
          temp_children.push(item);
        })
        result.confirm = temp_confirm;
        result.suspect = temp_suspect;
        result.dead = temp_dead;
        result.heal = temp_heal;
        result.children = temp_children;
        config.success(result);
      })
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });

}


this.information.total_info.confirm = data_all.confirm;
this.$set(this.information.total_info,'confirm',data_all.confirm);
this.information.total_info.suspect = data_all.suspect;
this.$set(this.information.total_info,'suspect',data_all.suspect);
this.information.total_info.dead = data_all.dead;
this.$set(this.information.total_info,'dead',data_all.dead);
this.information.total_info.heal = data_all.heal;
this.$set(this.information.total_info,'heal',data_all.heal);