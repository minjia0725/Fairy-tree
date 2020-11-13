<template>
  <div>
    <swiper></swiper>
    <div class="container">
      <div class="row justify-content-between mt-6">
        <div class="col-md-6" data-aos="fade-right" data-aos-delay="150">
          <div class="mt-4 mb-4 text-center">
            <h3 class="mb-0 h4 font-weight-bold">最新消息</h3>
          </div>
          <ul class="home-news-group pl-0">
            <li
              class="border-bottom py-2 text-primary text-black-50 h5 font-weight-blod border-primary"
              v-for="item in news"
              :key="item.conteont"
            >
              <span class="home-news-group-date pr-3 h6">{{ item.date }}</span
              >{{ item.content }}
            </li>
          </ul>
        </div>
        <div class="col-md-6" data-aos="fade-left" data-aos-delay="150">
          <div
            class="home-third-bgi bgi-fixed"
            style="
              background-image: url('https://images.unsplash.com/photo-1577991712260-4ee45603dab8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80');
            "
          >
            <div
              class="d-flex flex-column justify-content-center align-items-center text-center h-100 text-light"
            >
              <h3 class="mb-3 font-weight-bold">韓流明星周邊商品</h3>
              <p class="home-text-style">
                Fairy tree 專為你而生<br />
                為喜愛韓國流行音樂的你，都能找到想要的商品
              </p>
              <router-link to="/customerProducts" class="btn btn-primary"
                >SHOP NOW</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 home-product d-flex-center">
      <h3 class="text-white h4">商品介紹</h3>
    </div>
    <section
      v-for="(item, id) in guided"
      :key="id"
      :class="{ 'bg-secondary': item.reverse }"
    >
      <div class="container">
        <div class="row mt-8">
          <div class="col-12 py-3" data-aos="zoom-in" data-aos-delay="150">
            <div
              class="row justify-content-between"
              :class="{ 'flex-row-reverse': item.reverse }"
            >
              <div class="col-md-4 mb-4 mb-md-0">
                <div
                  :style="{ backgroundImage: `url(${item.image})` }"
                  class="bg-cover position-relative home-second-bgi"
                >
                  <div class="home-border text-white h3 font-weight-bold">
                    <router-link
                      class="d-flex-center h-100 home-product-text"
                      tag="div"
                      :to="{
                        path: '/customerProducts',
                        query: { category: item.title },
                      }"
                    >
                      <span>{{ item.title }}</span>
                    </router-link>
                  </div>
                </div>
              </div>
              <div class="col-md-7" :class="{ 'text-white': item.reverse }" data-aos="fade-left" data-aos-delay="150">
                <h5 class="font-weight-bold h2 mb-3">ABOUT {{ item.title }}</h5>
                <p class="h6 home-content">
                  {{ item.content }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import swiper from '@/components/Swiper.vue'
export default {
  name: 'Home',
  data () {
    return {
      guided: [
        {
          title: 'BTS',
          content:
            '2013年出道便包攬了國內外各大新人獎的防彈少年團，已成長為代表韓國的名副其實的最頂尖男子組合。如今這股防彈少年團旋風已席捲亞洲、北美、歐洲、南美、中東乃至全世界，晉升為國際巨星。在美國Billboard、英國Official Chart、日本Oricon、iTunes、Spotify、Apple Music等全球頂尖排行榜上的成績證明著這一切，唱片銷量、MV點擊量、SNS指數等各方面皆保持著一騎絕塵的數據記錄。體育場巡演的舉辦更是在全球演出市場彰顯了他們作為國際巨星的存在感，通過聯合國大會演講及 LOVE MYSELF Campaign等身體力行地傳播著正能量。在“第62屆格萊美獎”頒獎禮上作為史上首組韓國表演嘉賓呈現了精彩的演出，創下了席捲美國三大音樂頒獎禮（“公告牌音樂獎”、“全美音樂獎”、“格萊美獎”）的新紀錄。',
          image:
            'https://ibighit.com/bts/images/bts/discography/2_cool_4_school/album-cover.jpg',
          reverse: false
        },
        {
          title: 'TWICE',
          content:
            '2013年出道便包攬了國內外各大新人獎的防彈少年團，已成長為代表韓國的名副其實的最頂尖男子組合。如今這股防彈少年團旋風已席捲亞洲、北美、歐洲、南美、中東乃至全世界，晉升為國際巨星。在美國Billboard、英國Official Chart、日本Oricon、iTunes、Spotify、Apple Music等全球頂尖排行榜上的成績證明著這一切，唱片銷量、MV點擊量、SNS指數等各方面皆保持著一騎絕塵的數據記錄。體育場巡演的舉辦更是在全球演出市場彰顯了他們作為國際巨星的存在感，通過聯合國大會演講及 LOVE MYSELF Campaign等身體力行地傳播著正能量。在“第62屆格萊美獎”頒獎禮上作為史上首組韓國表演嘉賓呈現了精彩的演出，創下了席捲美國三大音樂頒獎禮（“公告牌音樂獎”、“全美音樂獎”、“格萊美獎”）的新紀錄。',
          image:
            'https://lv2-cdn.azureedge.net/twice/ff169a51fb0e4c73aab0afdb1c196337-TWICE%20EYES%20WIDE%20OPEN_ONLINECOVER.jpg',
          reverse: true
        },
        {
          title: 'STRAY KIDS',
          content:
            '2013年出道便包攬了國內外各大新人獎的防彈少年團，已成長為代表韓國的名副其實的最頂尖男子組合。如今這股防彈少年團旋風已席捲亞洲、北美、歐洲、南美、中東乃至全世界，晉升為國際巨星。在美國Billboard、英國Official Chart、日本Oricon、iTunes、Spotify、Apple Music等全球頂尖排行榜上的成績證明著這一切，唱片銷量、MV點擊量、SNS指數等各方面皆保持著一騎絕塵的數據記錄。體育場巡演的舉辦更是在全球演出市場彰顯了他們作為國際巨星的存在感，通過聯合國大會演講及 LOVE MYSELF Campaign等身體力行地傳播著正能量。在“第62屆格萊美獎”頒獎禮上作為史上首組韓國表演嘉賓呈現了精彩的演出，創下了席捲美國三大音樂頒獎禮（“公告牌音樂獎”、“全美音樂獎”、“格萊美獎”）的新紀錄。',
          image: 'https://lv2-cdn.azureedge.net/straykids/TOP-English_ver.jpg',
          reverse: false
        }
      ],
      news: [
        {
          date: '2020/10/11',
          content: '全館輸入優惠碼即享額外9折，優惠碼：FairyTree。'
        },
        {
          date: '2020/09/11',
          content: 'Fairy Tree 正式上線訂單滿$999，即享免運。'
        },
        {
          date: '2020/08/18',
          content: 'Fairy Tree 即將上線!!'
        },
        {
          date: '2020/07/25',
          content: 'Fairy Tree 專屬網站架設中。'
        }
      ]
    }
  },
  components: {
    swiper
  }
}
</script>
