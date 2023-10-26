function zip_list_of_streams(streams) {
    return pair(head(head(streams)), () => append(tail(streams), list(stream_tail(head(streams)))));
}

const x = zip_list_of_streams(list(enum_stream(0,5), enum_stream(3, 8)));

for(let i = 0; i < 10; i = i + 1) {
    display(stream_ref(x, i));
}